import { Apply } from '../generated/TwitterHumanityApplicant/TwitterHumanityApplicant'
import { TwitterApplication } from '../generated/schema'

export function handleApply(event: Apply): void {

  let id = event.params.proposalId.toString().concat('-').concat(event.params.applicant.toHexString())
  let application = new TwitterApplication(id)
  application.applicant = event.params.applicant
  application.username = event.params.username
  application.save()
}
