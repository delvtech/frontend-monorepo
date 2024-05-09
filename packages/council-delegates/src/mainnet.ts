// Mainnet only
import fetch from "node-fetch";
import words from "lodash.words";
import { Delegate } from "src/types";
import fs from "fs";
import { utils } from "ethers";
import uniqBy from "lodash.uniqby";
import { mainnetDelegateExceptions } from "./delegateExceptions";

const DELEGATES_JSON_OUTPUT_FILE = "./src/json/mainnet.delegates.json";
const WORD_OR_ADRESS_REGEX = /(0x)?[\w]+/g;

(async function main() {
  // Grab the scraped delegates from the forum
  const scrapedDelegates = await scrapeMainnetDelegates();

  // Add in our exceptions
  const delegates: Delegate[] = [
    ...scrapedDelegates,
    ...mainnetDelegateExceptions,
  ];

  // Sort them by createdAt, newest at the bottom of the list
  const sortedDelegates = delegates.sort((delegateA, delegateB) => {
    const a = new Date(delegateA.createdAt).getTime();
    const b = new Date(delegateB.createdAt).getTime();
    return a - b;
  });

  const json = JSON.stringify(
    { chainId: 1, delegates: sortedDelegates },
    null,
    2,
  );

  fs.writeFileSync(DELEGATES_JSON_OUTPUT_FILE, json, {
    flag: "w",
  });
})();

async function scrapeMainnetDelegates(): Promise<Delegate[]> {
  const response = await fetch(
    "https://forum.website.com/api/viewComments?chain=element-finance&root_id=discussion_4146",
  );
  const data = (await response.json()) as ForumCommentsResult;

  const allDelegates: Delegate[] = data.result
    // Filter out any comments that we can't scrape the address for
    .filter((forumComment) => {
      const addressCanBeScraped = !!scrapeAddressFromForumComment(forumComment);
      const commentWasDeleted = !!forumComment.deleted_at;

      return addressCanBeScraped && !commentWasDeleted;
    })
    // Then map them to delegates
    .map((forumComment): Delegate => {
      const scrapedAddress = scrapeAddressFromForumComment(
        forumComment,
      ) as string; // safe to cast since the previous filter removed any undefineds

      return {
        address: scrapedAddress,
        commonwealthCommentId: forumComment.id,
        createdAt: forumComment.created_at,
        commonwealthName: forumComment.Address.name || "Anonymous",
        commonwealthPostedFromAddress: forumComment.Address.address,
      };
    });

  const uniqDelegates = uniqBy(allDelegates, ({ address }) => address);

  return uniqDelegates;
}

function scrapeAddressFromForumComment(forumComment: ForumComment) {
  // Parse the comment into words, then grab the first instance of an eth address
  const parsedWords = words(forumComment.plaintext, WORD_OR_ADRESS_REGEX);
  const scrapedAddressFromPlainText = parsedWords.find((word) =>
    utils.isAddress(word),
  );
  return scrapedAddressFromPlainText;
}

interface ForumCommentsResult {
  // The shape of the raw result from the forum api, only includes things we are actually using.
  result: ForumComment[];
}

interface ForumComment {
  /**
   * the id for the comment, useful for creating links
   */
  id: number;
  created_at: string;
  deleted_at: string | null;
  /**
   * The plaintext of their comment. This is what we parse for Delegate
   * information.
   */
  plaintext: string;
  Address: {
    /**
     * the address the user is posting from
     */
    address: string;
    /**
     * the screen name in the forum for this address
     */
    name: string;
  };
}
