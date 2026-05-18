import json
import os
import sys
import argparse
import string

import requests


team_query = string.Template(
    """
  query {
    organization(login: "$org") {
      team(slug: "$team") {
        name,
        members(first: 100, orderBy: {field: LOGIN, direction: ASC}) {
          nodes {
            login
            name
            url
            avatarUrl
          }
        }
      }
    }
  }
"""
)


def api(query):
    request = requests.post(
        "https://api.github.com/graphql",
        json={"query": query},
        headers={"Authorization": f"bearer {token}"},
    )
    if request.status_code == 200:
        return request.json()
    else:
        raise RuntimeError(f"Request received HTTP {request.status_code}: {query}")


parser = argparse.ArgumentParser(description="Generate team gallery JSON from GitHub")
parser.add_argument("--org", required=True, help="GitHub organization name")
parser.add_argument("--team", required=True, help="Team name in the organization")
parser.add_argument("--output", "-o", help="Output file path (default: stdout)")
args = parser.parse_args()

org = args.org
team = args.team

token = os.environ.get("GH_TOKEN", None)
if token is None:
    print(
        "No token found.  Please export a GH_TOKEN with permissions "
        "to read team members.",
        file=sys.stderr,
    )
    sys.exit(-1)


resp = api(team_query.substitute(org=org, team=team))
members = resp["data"]["organization"]["team"]["members"]["nodes"]

members_list = []
for m in members:
    members_list.append(
        {
            "name": m["name"] or m["login"],
            "login": m["login"],
            "url": m["url"],
            "avatarUrl": m["avatarUrl"],
        }
    )

output = json.dumps(members_list, indent=2, ensure_ascii=False)

if args.output:
    with open(args.output, "w", encoding="utf-8") as f:
        f.write(output + "\n")
else:
    print(output)
