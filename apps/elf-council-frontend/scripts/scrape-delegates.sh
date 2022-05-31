# Mainnet only
curl -s "https://forum.element.fi/api/viewComments?chain=element-finance&root_id=discussion_4146" |
  jq '{ 
  result: [.result[] 
    | select(.deleted_at = null)
    | select(.plaintext | ascii_downcase | contains("statement of intent") or length > 280)
    | select(.plaintext | ascii_downcase | contains("ethereum address"))
    | { 
	commonwealthCommentId: .id,
	"commonweathName": .Address["name"],
	"commonwealthPostedFromAddress": .Address["address"],
	"address": .plaintext | match("0x[a-fA-F0-9]{40}").string,
	created_at,
      }]}' > src/elf-council-delegates/delegate_mainnet_scraped_results.json

