import {
  Execute,
  Propose,
  RemoveVote,
  Terminate,
  Vote as VoteEvent,
  HumanityGovernance
} from '../generated/HumanityGovernance/HumanityGovernance'
import { Proposal, Vote } from '../generated/schema'
import {BigInt, store} from "@graphprotocol/graph-ts";

export function handleExecute(event: Execute): void {
  let proposal = new Proposal(event.params.proposalId.toString())
  proposal.result = "Yes"
  proposal.save()
}

export function handlePropose(event: Propose): void {
  let proposal = new Proposal(event.params.proposalId.toString())
  let contract = HumanityGovernance.bind(event.address)
  let proposalData = contract.proposals(event.params.proposalId)
  proposal.result = "Pending"
  proposal.target = proposalData.value1
  proposal.data = proposalData.value2
  proposal.proposer = proposalData.value3
  proposal.feeRecipient = proposalData.value4
  proposal.fee = proposalData.value5
  proposal.startTime = proposalData.value6
  proposal.yesCount = proposalData.value7
  proposal.noCount = proposalData.value8
  proposal.save()
}

export function handleRemoveVote(event: RemoveVote): void {
  let proposal = new Proposal(event.params.proposalId.toString())
  let contract = HumanityGovernance.bind(event.address)
  let proposalData = contract.proposals(event.params.proposalId)
  proposal.yesCount = proposalData.value7
  proposal.noCount = proposalData.value8
  proposal.save()

  let id = event.params.proposalId.toString().concat('-').concat(event.params.voter.toHexString())
  store.remove("Vote", id)
}

export function handleTerminate(event: Terminate): void {
  let proposal = new Proposal(event.params.proposalId.toString())
  proposal.result = "No"
  proposal.save()
}

export function handleVote(event: VoteEvent): void {
  let id = event.params.proposalId.toString().concat('-').concat(event.params.voter.toHexString())
  let vote = new Vote(id)
  vote.user = event.params.voter
  if (event.params.approve == true) {
    vote.yesVotes = event.params.weight
    vote.noVotes = BigInt.fromI32(0)
  } else {
    vote.noVotes = event.params.weight
    vote.yesVotes = BigInt.fromI32(0)
  }
  vote.save()
}