document.addEventListener("DOMContentLoaded", function () {
  const membersContainer = document.getElementById("members-container");
  const membersList = document.getElementById("members-list");
  const toggleButtons = document.querySelectorAll(".toggle-btn");

  if (!membersContainer || !membersList) {
    console.error("Containers not found in the DOM");
    return;
  }

  function switchView(viewType) {
    if (viewType === "grid") {
      membersContainer.style.display = "grid";
      membersList.style.display = "none";
    } else {
      membersContainer.style.display = "none";
      membersList.style.display = "flex";
    }

    toggleButtons.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.view === viewType);
    });
  }

  toggleButtons.forEach((button) => {
    button.addEventListener("click", () => {
      switchView(button.dataset.view);
    });
  });

  async function loadMembers() {
    try {
      const response = await fetch("./data/members.json");

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const members = await response.json();
      displayMembers(members);
    } catch (error) {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
      membersContainer.innerHTML = `
      <div class="error-message">
      <p>Error loading members. Please try again later.</p>
      <p>${error.message}</p>
      </div>`;
    }
  }

  function displayMembers(members) {

    if (!Array.isArray(members)) {
      console.error("Members data is not an array", members);
      return;
    }

    membersContainer.innerHTML = members
      .map(
        (member) => `
      <div class="member-card">
        <div class="member-header">
          <div>
            <h3 class="member-name">${member.name}</h3>
            <span class="member-level ${getMembershipLevel(
              member.membershipLevel
            )}">
              
            </span>
          </div>
        </div>
        <div class="member-info">
          <p>📍 ${member.address}</p>
          <p>📞 ${member.phone}</p>
          <p>🌐 <a href="${member.website}" target="_blank">${
          member.website
        }</a></p>
          <p>${member.description}</p>
        </div>
      </div>
    `
      )
      .join("");

    membersList.innerHTML = members
      .map(
        (member) => `
      <div class="member-item">
        <div class="member-name">${member.name}</div>
        <div class="member-contact">
          <p>${member.phone}</p>
          <p><a href="${member.website}" target="_blank">${
          member.website
        }</a></p>
        </div>
        <span class="member-level ${getMembershipLevel(
          member.membershipLevel
        )}">
        </span>
      </div>
    `
      )
      .join("");
  }

  function getMembershipLevel(level) {
    const levels = {
      1: "Basic Member",
      2: "Silver Member",
      3: "Gold Member",
    };
    return levels[level] || "Unknown Membership Level";
  }

  loadMembers();
  switchView("grid");
});
