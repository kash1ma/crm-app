export default function sortByName(users, order = "ascending") {
  return users.sort((a, b) => {
    const fullNameA = `${a.name || ""} ${a.surname || ""} ${
      a.lastName || ""
    }`.trim();
    const fullNameB = `${b.name || ""} ${b.surname || ""} ${
      b.lastName || ""
    }`.trim();

    if (order === "ascending") {
      return fullNameA.localeCompare(fullNameB);
    } else {
      return fullNameB.localeCompare(fullNameA);
    }
  });
}
