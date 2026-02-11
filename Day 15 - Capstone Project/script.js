// Foundation Capstone: THE VIRTUAL CORE

function startSystem() {
  // --- Step 1: The Boot Sequence ---
  const PIN = "9999";
  let attempts = 0;
  let isAuthenticated = false;

  while (attempts < 3) {
    let input = prompt("ENTER MASTER PIN:");

    if (input === PIN) {
      isAuthenticated = true;
      break;
    } else {
      attempts++;
      alert(`ACCESS DENIED. ATTEMPTS REMAINING: ${3 - attempts}`);
    }
  }

  if (!isAuthenticated) {
    alert("SYSTEM SELF-DESTRUCT INITIATED...");
    return; // Terminate execution
  }

  // Success Banner
  alert(
    "********************************\n" +
      "*  Welcome to Virtual Core v1.0 *\n" +
      "********************************",
  );

  // --- Global State ---
  let balance = 1000;
  const SECRET_WORD = "javascript";
  const UNIT_PRICE = 50;

  // --- Step 2: The Command Kernel ---
  let running = true;

  while (running) {
    let command = prompt(
      `[V-CORE] | Balance: $${balance}\n` +
        "Type command: (bank, shop, vault, exit)",
    );

    if (command === null) {
      // Handle cancel button gracefully
      command = "exit";
    }

    command = command.toLowerCase().trim();

    switch (command) {
      case "bank":
        // --- Step 3: Banking Kernel ---
        let banking = true;
        while (banking) {
          let bankCmd = prompt(
            `--- BANKING SYSTEM ---\n` +
              `Balance: $${balance}\n` +
              `Commands: deposit, withdraw, balance, back`,
          );

          if (bankCmd === null) bankCmd = "back";
          bankCmd = bankCmd.toLowerCase().trim();

          if (bankCmd === "deposit") {
            let amount = parseFloat(prompt("Enter deposit amount:"));
            if (!isNaN(amount) && amount > 0) {
              balance += amount;
              alert(`Deposited $${amount}. New Balance: $${balance}`);
            } else {
              alert("Invalid amount.");
            }
          } else if (bankCmd === "withdraw") {
            let amount = parseFloat(prompt("Enter withdrawal amount:"));
            if (!isNaN(amount) && amount > 0) {
              if (amount > balance) {
                alert("INSUFFICIENT FUNDS.");
              } else {
                balance -= amount;
                alert(`Withdrawn $${amount}. New Balance: $${balance}`);
              }
            } else {
              alert("Invalid amount.");
            }
          } else if (bankCmd === "balance") {
            alert(`Current Balance: $${balance}`);
          } else if (bankCmd === "back") {
            banking = false;
          } else {
            alert("Invalid Bank Command.");
          }
        }
        break;

      case "shop":
        // --- Step 4: The Smart Shop ---
        let qtyInput = prompt(
          `--- SMART SHOP ---\n` +
            `Unit Price: $${UNIT_PRICE}\n` +
            `Enter quantity to purchase:`,
        );

        let qty = parseFloat(qtyInput);

        if (!isNaN(qty) && qty > 0) {
          let subtotal = qty * UNIT_PRICE;
          let discount = 0;

          if (qty <= 5) {
            discount = 0;
          } else if (qty <= 10) {
            discount = 0.1;
          } else {
            discount = 0.2;
          }

          let discountAmount = subtotal * discount;
          let finalPrice = subtotal - discountAmount;

          let confirmPurchase = confirm(
            `Order Summary:\n` +
              `Quantity: ${qty}\n` +
              `Subtotal: $${subtotal}\n` +
              `Discount: ${discount * 100}%\n` +
              `Final Price: $${finalPrice}\n\n` +
              `Current Balance: $${balance}\n` +
              `Proceed with purchase?`,
          );

          if (confirmPurchase) {
            if (balance >= finalPrice) {
              balance -= finalPrice;
              alert(`Purchase Successful!\nRemaining Balance: $${balance}`);
            } else {
              alert("INSUFFICIENT FUNDS. Transaction Cancelled.");
            }
          }
        } else {
          alert("Invalid Quantity.");
        }
        break;

      case "vault":
        // --- Step 5: The Secure Vault ---
        alert("--- SECURE VAULT ---\nHint: The language of the web.");
        let guess = prompt("Enter the secret word:");

        if (guess !== null && guess.toLowerCase().trim() === SECRET_WORD) {
          alert(
            "ACCESS GRANTED.\n" + "Secret Message: You are a coding master! 🚀",
          );
        } else {
          alert("ACCESS DENIED. Returning to kernel...");
        }
        break;

      case "exit":
        running = false;
        alert("System Shutting Down...");
        break;

      default:
        alert("INVALID COMMAND. Try again.");
        break;
    }
  }
}
