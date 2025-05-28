async function loadMembers() {
  try {
    const response = await fetch("./data/members.json");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const members = await response.json();
    displayMembers(members);
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}

function displayMembers(members) {
  console.log(members);

}

loadMembers();