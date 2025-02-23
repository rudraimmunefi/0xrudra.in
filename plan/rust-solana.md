
## Week 1: Rust for Solana Development

**Goal:** Master Rust fundamentals—especially those crucial for Solana smart contracts. Learn about ownership, borrowing, lifetimes, traits, generics, serialization (Borsh/Serde), and error handling with practical exercises.

### Day 1: Setup and Rust Basics

**Focus:** Environment setup and Rust syntax fundamentals (variables, data types, functions, control flow).

- [ ] **Install Rust and Tools**
  - [ ] Install the latest stable Rust using `rustup` and verify with `rustc --version`.
  - [ ] Ensure Cargo (Rust’s package manager) is installed and working (`cargo --version`).
  - [ ] (Optional) Install the Rust Analyzer extension (e.g., for VSCode) for enhanced IDE support.
  - [ ] Install **Rustlings**:
    ```bash
    cargo install rustlings
    rustlings init
    ```
- [ ] **Rust Syntax Crash Course**
  - [ ] Create a new project with Cargo: `cargo new hello_rust`.
  - [ ] Write a “Hello, World” program in `main.rs` using `println!` and run it with `cargo run`.
  - [ ] Experiment with variables (mutable vs. immutable) and data types.
  - [ ] Write a simple function that takes parameters and returns a value.
- [ ] **Control Flow**
  - [ ] Use `if`/`else` statements to make decisions (e.g., check if a number is even or odd).
  - [ ] Write a `for` loop over a range and a `while` loop for repetition.
  - [ ] Practice pattern matching with a simple enum or integer using `match`.
- [ ] **Rustlings Exercises (Basics)**
  - [ ] Complete exercises in the Rustlings *basics* section.
  - [ ] Verify your progress with `rustlings verify`.

---

### Day 2: Ownership and Borrowing

**Focus:** Understand Rust’s ownership model and borrowing rules.

- [ ] **Learn Ownership Concepts**
  - [ ] Read the Ownership chapter from *The Rust Programming Language*.
  - [ ] Summarize the three rules of ownership:
    - Every value has a single owner.
    - There can only be one owner at a time.
    - When the owner goes out of scope, the value is dropped.
  - [ ] Write a program that illustrates ownership transfer (e.g., passing a `String` to a function).
  - [ ] Experiment with cloning a value.
- [ ] **Borrowing & References**
  - [ ] Write a function that borrows data via an immutable reference.
  - [ ] Modify your code to use mutable references (`&mut`) and observe compiler restrictions.
  - [ ] Experiment with nested scopes to see how borrowing works.
- [ ] **Practice Ownership/Borrowing**
  - [ ] Complete Rustlings exercises related to ownership and borrowing.
  - [ ] Implement functions that return values by either transferring ownership or borrowing.

---

### Day 3: Lifetimes and Structs

**Focus:** Learn about lifetimes (ensuring references remain valid) and create/use structs—important for building account data structures.

- [ ] **Lifetimes Basics**
  - [ ] Read about lifetimes and why they are necessary in Rust.
  - [ ] Write a function (e.g., `fn longest<'a>(x: &'a str, y: &'a str) -> &'a str`) that returns the longer of two strings.
  - [ ] Define a struct that holds a reference (e.g., `struct Excerpt<'a> { part: &'a str }`) and annotate with lifetimes.
- [ ] **Using Structs**
  - [ ] Define a simple struct (e.g., `struct Book { title: String, author: String, pages: u32 }`).
  - [ ] Implement methods on the struct using an `impl` block.
  - [ ] Create a struct that owns heap data (e.g., a `Library` with a `Vec<Book>`).
- [ ] **Lifetimes in Practice**
  - [ ] Annotate a piece of code with lifetime comments to track reference lifetimes.
  - [ ] Complete related Rustlings exercises.

---

### Day 4: Traits and Generics

**Focus:** Understand traits (defining shared behavior) and generics (writing reusable code).

- [ ] **Generics**
  - [ ] Read about generics in the Rust book.
  - [ ] Write a generic function (e.g., `fn largest<T: PartialOrd + Copy>(list: &[T]) -> T`).
  - [ ] Define a generic struct (e.g., `struct Pair<T, U> { x: T, y: U }`).
- [ ] **Traits**
  - [ ] Read about traits and implement a simple trait (e.g., `trait Summary { fn summarize(&self) -> String; }`).
  - [ ] Implement the trait for a custom struct (e.g., for your `Book` struct).
  - [ ] Use trait bounds in a generic function.
- [ ] **Derivable Traits**
  - [ ] Use `#[derive(Debug, Clone, Default)]` on your structs.
  - [ ] Compare manual trait implementation versus using derive.
- [ ] **Exercises**
  - [ ] Complete Rustlings exercises on traits and generics.

---

### Day 5: Serialization with Borsh and Serde

**Focus:** Learn how to serialize/deserialize data using Borsh (used in Solana) and Serde.

- [ ] **Understand Serialization**
  - [ ] Read about the purpose of serialization and deserialization.
  - [ ] Learn the basics of Borsh (Binary Object Representation Serializer for Hashing).
  - [ ] Briefly review Serde and its common use cases.
- [ ] **Set Up Serialization in a Project**
  - [ ] Create a new project and add `borsh` (and optionally `serde` with derive features) to `Cargo.toml`.
  - [ ] Define a struct (e.g., `struct Player { name: String, score: u32 }`) and derive `BorshSerialize`, `BorshDeserialize`, and `Debug`.
  - [ ] Serialize and deserialize an instance using Borsh.
  - [ ] Repeat the process using Serde (e.g., with JSON) and compare the outputs.
- [ ] **Apply to Solana Context**
  - [ ] Research why deterministic serialization (like Borsh) is essential for on-chain data.
  - [ ] (Optional) Read Solana documentation regarding data serialization for account state.

---

### Day 6: Error Handling in Rust

**Focus:** Master Rust’s error handling using `Result`, `Option`, and the `?` operator.

- [ ] **Error Handling Concepts**
  - [ ] Read about the `Result<T, E>` type and when to use it.
  - [ ] Write a function that returns a `Result` (e.g., reading a number from a file).
  - [ ] Practice using the `?` operator to propagate errors.
  - [ ] Experiment with the `Option` type.
- [ ] **Custom Error Types**
  - [ ] Define your own error enum and implement `Display` and `Error` (or use the `thiserror` crate).
  - [ ] Write functions that return custom errors.
- [ ] **Practice**
  - [ ] Create a toy program (e.g., a bank account transfer simulation) that uses error handling to manage invalid operations.

---

### Day 7: Rust Project & Recap

**Focus:** Consolidate your learning with a mini-project and review all key Rust concepts.

- [ ] **Mini‑Project: Build a Simple Bank Account CLI**
  - [ ] Define a `BankAccount` struct with fields like `owner: String` and `balance: u64`.
  - [ ] Implement methods for deposit and withdrawal (using error handling to manage insufficient funds).
  - [ ] Write a simple CLI in `main` to interact with multiple bank accounts (create, deposit, withdraw, transfer).
  - [ ] (Optional) Add serialization to save and load account data.
- [ ] **Review**
  - [ ] Revisit any Rustlings exercises you found challenging.
  - [ ] Create a one‑page cheat sheet summarizing Rust’s ownership, borrowing, lifetimes, and error handling.
  - [ ] Ensure your development environment is fully set up for Week 2.

---

## Week 2: Solana Smart Contract Development

**Goal:** Apply your Rust skills to Solana. Learn about Solana’s program structure, the account model, PDAs, Anchor framework, testing, and security best practices.

### Day 8: Solana Environment Setup & Overview

**Focus:** Set up the Solana and Anchor development environment and gain an overview of Solana’s runtime.

- [ ] **Install Solana CLI Tools**
  - [ ] Install the Solana CLI and verify with `solana --version`.
  - [ ] Set up a local test validator using `solana-test-validator`.
  - [ ] Create a new keypair and fund it via `solana airdrop`.
- [ ] **Install Anchor Framework**
  - [ ] Install the Anchor CLI (follow the latest instructions from Anchor’s docs).
  - [ ] Verify Anchor installation with `anchor --version`.
  - [ ] Ensure your Rust toolchain is set for the BPF target (`rustup target add bpfel-unknown-unknown`).
- [ ] **Solana Architecture Overview**
  - [ ] Read about Solana’s account model, program execution, and transaction flow.
  - [ ] Familiarize yourself with key concepts like rent, account ownership, and system programs.
  - [ ] (Optional) Explore the Solana Explorer to view on-chain accounts.

---

### Day 9: Solana Program Structure & Accounts (using Anchor)

**Focus:** Create your first Anchor program and learn about instruction handling and account constraints.

- [ ] **Scaffold a New Anchor Program**
  - [ ] Run `anchor init solana_program_hello` to create a new project.
  - [ ] Explore the generated folder structure (notably `/programs` and `/tests`).
- [ ] **Review Anchor Program Basics**
  - [ ] Examine the `#[program]` macro and the generated entrypoint.
  - [ ] Understand how Anchor uses `Context<T>` to provide typed access to accounts.
- [ ] **Define a Simple Instruction**
  - [ ] Create an instruction (e.g., `initialize`) that logs a message using `msg!`.
  - [ ] Define an `Initialize` context struct with necessary accounts (e.g., a mutable signer as `payer`).
  - [ ] Build the program with `anchor build` and run `anchor test` to ensure it compiles.
- [ ] **Extend the Program with State**
  - [ ] Define a state struct (e.g., `#[account] pub struct DataAccount { pub value: u64 }`).\n  - [ ] Create instructions to initialize and update `DataAccount` with proper account constraints (using `init`, `mut`, and PDAs if needed).
  - [ ] Test your instructions locally.

---

### Day 10: Program Derived Addresses (PDAs) Deep Dive

**Focus:** Understand and practice using PDAs to create deterministic, program-owned accounts.

- [ ] **Learn PDA Concepts**
  - [ ] Read about PDAs and why they are used (deterministic addresses, no private key control).
  - [ ] Review how to derive a PDA using `Pubkey::find_program_address`.
- [ ] **Implement PDA in Your Program**
  - [ ] In your Anchor program, define an account that uses a PDA (e.g., a `data_account` with seeds like `[b\"data\", payer.key().as_ref()]`).
  - [ ] Add a new instruction (e.g., `create_vault`) that creates an account with a fixed seed (e.g., `[b\"vault\"]`).
  - [ ] Test the PDA derivation by writing a client-side snippet (in Rust or TypeScript) to verify the derived address.
- [ ] **Practice with PDAs**
  - [ ] Extend your program to include an instruction that uses `invoke_signed` (if possible) for transferring lamports or tokens from a PDA.
  - [ ] Validate that re-invoking the instruction fails when the PDA already exists (ensuring uniqueness).

---

### Day 11: Anchor Advanced Features & Testing

**Focus:** Explore advanced features of Anchor (error handling, events, CPIs) and write comprehensive tests.

- [ ] **Advanced Anchor Features**
  - [ ] Define custom error codes using `#[error_code]` and use them in your instruction handlers.
  - [ ] (Optional) Define and emit events using the `#[event]` attribute.
  - [ ] Learn about Cross-Program Invocation (CPI) and experiment with a simple CPI call.
- [ ] **Testing Your Program**
  - [ ] Write integration tests in Rust (using `solana_program_test`) or TypeScript (using Anchor’s TS library).
  - [ ] Test all instructions, including both success and failure scenarios.
  - [ ] Run `anchor test` and ensure all tests pass.

---

### Day 12: Solana Security Pitfalls and Best Practices

**Focus:** Identify common security vulnerabilities in Solana programs and apply best practices.

- [ ] **Review Common Vulnerabilities**
  - [ ] Study issues like missing ownership/signature checks, unchecked arithmetic (overflow/underflow), and misused CPIs.
  - [ ] Compare your program’s design with known pitfalls (e.g., missing owner checks, improper PDA seed usage).
- [ ] **Self-Audit Your Code**
  - [ ] For each instruction, list preconditions (owner checks, signer checks, data validations) and verify they’re enforced.
  - [ ] Check arithmetic operations and consider using safe math (e.g., checked_add, checked_sub).
  - [ ] Ensure external calls (CPIs) reference the correct program IDs.
- [ ] **Document a Security Checklist**
  - [ ] Write down a personal checklist for secure Solana programming (include owner/signer checks, account size, rent exemption, and PDA constraints).

---

### Day 13: Research Latest Security Vulnerabilities

**Focus:** Study recent Solana vulnerabilities and learn how auditors find bugs.

- [ ] **Review Recent Exploits**
  - [ ] Research major Solana vulnerabilities (e.g., Wormhole hack, Mango Markets incidents) and note lessons learned.
  - [ ] For each case, summarize:
    - The vulnerability (e.g., missing check, overflow, etc.).
    - How it was exploited.
    - Mitigation strategies.
- [ ] **Auditing Strategies**
  - [ ] Read about tools and methods (e.g., static analysis, fuzz testing) used by professional auditors.
  - [ ] (Optional) Run a static analysis tool (like Solana’s X‑Ray or a similar linter) on your code.
- [ ] **Summarize Learnings**
  - [ ] Write a short summary of the top security practices you must always follow.
  - [ ] Update your security checklist with any new insights.

---

### Day 14: Auditing & Final Project Wrap-Up

**Focus:** Finalize your project, perform a comprehensive audit, and plan next steps.

- [ ] **Perform a Final Audit**
  - [ ] Systematically review your program using your security checklist:
    - Verify initialization checks and that accounts are created only once.
    - Confirm authority/signature checks on all mutating instructions.
    - Check all arithmetic and state updates for safe operations.
    - Validate PDA derivations and proper use of CPIs.
  - [ ] Run tests for edge cases and negative scenarios.
- [ ] **(Optional) Deploy to Devnet**
  - [ ] Configure your Anchor project for devnet (update `Anchor.toml` and your keypair).
  - [ ] Run `anchor build && anchor deploy` to deploy your program to devnet.
  - [ ] Interact with your deployed program using an Anchor client or TypeScript script.
- [ ] **Create a Final Audit Checklist Document**
  - [ ] Write a comprehensive Solana Program Audit Checklist (covering general security, account checks, PDA usage, and testing).
- [ ] **Reflect & Plan Next Steps**
  - [ ] Document what you’ve learned and identify areas for further study (e.g., deeper Anchor features, SPL tokens, more complex programs).
  - [ ] Celebrate your progress and set goals for your next project!

---

