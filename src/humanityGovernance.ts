import {
  Execute,
  Propose,
  RemoveVote,
  Terminate,
  Vote as VoteEvent,
  HumanityGovernance
} from '../generated/HumanityGovernance/HumanityGovernance'
import { Proposal, Vote } from '../generated/schema'
import {BigInt} from "@graphprotocol/graph-ts";

export function handleExecute(event: Execute): void {


}

export function handlePropose(event: Propose): void {

  let proposal = new Proposal(event.params.proposalId.toString())
  let contract = HumanityGovernance.bind(event.address)
  let proposalData = contract.getProposal(event.params.proposalId)
  proposal.result = "Pending"
  // proposal.address = proposalData./
  // TODO - figure out how to do this the new way

  proposal.save()


}

export function handleRemoveVote(event: RemoveVote): void {
  

}

export function handleTerminate(event: Terminate): void {


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