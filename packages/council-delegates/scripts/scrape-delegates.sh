# Mainnet only
MAINNET_OUTPUT=src/elf-council-delegates/delegate_mainnet_scraped_results.json

# Scrape the comments and create a list of json objects for each delegate comment
curl -s "https://forum.element.fi/api/viewComments?chain=element-finance&root_id=discussion_4146" |
  # collect the initial json objects for each delegate comment
  jq '{ 
  result: [.result[] 
    | select(.deleted_at = null)
    | { 
	commonwealthCommentId: .id,
	"commonwealthName": (.Address["name"] // "Anonymous"),
	"commonwealthPostedFromAddress": .Address["address"],
	"address": .plaintext | match("0x[a-fA-F0-9]{40}").string,
	created_at,
      }]}' |
      # dedupe and write to file
       jq '.result |= unique_by(.address)' > "$MAINNET_OUTPUT"

# print output for sanity checking in the terminal
cat "$MAINNET_OUTPUT"