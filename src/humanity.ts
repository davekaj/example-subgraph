import { Transfer } from '../generated/Humanity/Humanity'
import { User } from '../generated/schema'
import {BigInt} from "@graphprotocol/graph-ts";

export function handleTransfer(event: Transfer): void {
  let userTo = new User(event.params.to.toHexString())
  if (userTo == null){
    userTo = new User(event.params.to.toHexString())
    userTo.balance = BigInt.fromI32(0)
    userTo.applications = []
    userTo.votes = []
  }
  userTo.balance = userTo.balance.plus(event.params.value)
  userTo.save()

  let userFrom = new User(event.params.from.toHexString())
  if (userFrom == null){
    userFrom = new User(event.params.from.toHexString())
    userFrom.balance = BigInt.fromI32(0)
    userFrom.applications = []
    userFrom.votes = []
  }
  userFrom.balance = userFrom.balance.minus(event.params.value)
  userFrom.save()
}
