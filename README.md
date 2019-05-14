# Humanity Subgraph

See all possible queries below:

```graphql
{
  proposals{
    id
    result
    target
    data
    proposer
    feeRecipient
    fee
    startTime
    yesCount
    noCount
  }
  votes{
    id
    user
    yesVotes
    noVotes
  }
  twitterApplications{
    id
    applicant
    username
  }
  users{
    id
    balance
    applications{
      id
      applicant
      username
    }
    votes{
      id
      user
      yesVotes
      noVotes
    }
  }
}
```