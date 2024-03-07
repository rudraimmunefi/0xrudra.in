## Defi Glossary
---

* **Margin Trading** is a stratergy where a borrower can utlise their collatoral to borrow different assest from the lender.
  
* **Option Trading** is a stratergy where a borrower can put a margin or put option predicating the price of an asset. Option contract give you the right but not the obligation to buy/sell the asset.
    * **Call options**: Right to buy crypto at a certain price by a certain date (like buying now, pay later, but for crypto).
    * **Put options**: Right to sell crypto at a certain price by a certain date (like insurance against price drops).
    * *As an option buyer*, what you need to pay upfront is called “**the premium**” which will be the maximum amount of money you can lose if you don’t exercise your right in the future.

* **Futures contracts** let you speculate on an asset's price by agreeing to buy or sell at a set price on a future date. You can choose cash settlement (receive/pay the difference) or physical delivery (actually get/give the asset).
  * They offer leverage (control a larger position with less capital) but come with amplified risks. Losses can exceed your initial investment if the market moves against you.

* **Perpetual contracts** are similar to futures but without an expiry date, allowing you to hold your position indefinitely. They also involve margin and leverage.

<!-- add horizontal line -->
---
### Governance 

* Proposal

Every vote begins with a proposal, which was described earlier. It is always an Ethereum transaction that can be signed, I.e. it has a target address(es) and calldata(s).


To prevent proposal spam, contracts usually have some kind of a filter for who can create the proposal, usually an adddress that must hold a certain percentage of the total supply of the governance token.


Under the hood, a proposal is usually a solidity struct with some flags about its current state, the votes applied to it, and what transactions will be executed if the proposal passes.


* Vote

Unsurprisingly, a vote is an ethereum transaction where the voter votes for or against a proposal. The vote is usually weighed by the amount of tokens the address held at the relevant snapshot.


* Quorum

If no action could be taken unless 100% of the token holders voted, then it is very likely nothing would ever be accomplished, as the system would grind to a halt if only one token holder decided not to participate. On the other hand, if only 1% of the votes were required for an election to be valid, it would be too easy pass undesirable proposals.


For the fate of a proposal to be decided, it must reach a quorum threshold (a percentage of the total possible votes) within the voting period.


* Voting period

Proposals don’t wait around indefinitely waiting for the quorum to be reached. Otherwise, the governance proposal might be executed at a time when the circumstances that prompted the proposal change. This countdown starts as soon as the proposal is created and if quorum isn’t reached within the time limit, the proposal is defeated.


* Queued and Execution

If enough votes passed the quorum threshold in favor of the proposal, before the voting period expired, then the proposal is considered the have passed. For safety reasons, there is usually a time delay between when a proposal succeeds and when it actually gets executed.


* Timelock

Not to be confused with the voting period, this is a delay between when a proposal has been approved and when the action is actually executed.


Consider a situation where a controversial proposal is in the governance contract, and a subset of dissenting users will withdraw liquidity if the proposal is enacted. The timelock gives them a window to leave after they see the lost the vote.


Giving users a chance to take action against unfavorable proposals incentives proposers to only include proposals that won’t cause a revolt.
