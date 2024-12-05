export default function sortByDate(
  users,
  sortBy = "createdAt",
  order = "ascending"
) {
  if (!["createdAt", "updatedAt"].includes(sortBy)) {
    throw new Error("Invalid sortBy option. Use 'createdAt' or 'updatedAt'.");
  }

  return users.sort((a, b) => {
    const dateA = new Date(a[sortBy]);
    const dateB = new Date(b[sortBy]);
    return order === "ascending" ? dateA - dateB : dateB - dateA;
  });
}

// const users = [
//   {
//     id: 3,
//     name: "Henriette",
//     surname: "Pfeffer",
//     lastName: null,
//     contacts:
//       '[{"type":"email","email":"Isabella_Osinski@gmail.com"},{"type":"phone","value":"(437) 861-7014 x4989"}]',
//     createdAt: "2024-12-04T21:16:46.325Z",
//     updatedAt: "2024-12-04T21:16:46.325Z",
//   },
//   {
//     id: 4,
//     name: "Lisette",
//     surname: "Smitham",
//     lastName: null,
//     contacts:
//       '[{"type":"email","email":"Raina.Crooks16@hotmail.com"},{"type":"phone","value":"625-623-4199 x75957"}]',
//     createdAt: "2024-12-04T21:16:46.326Z",
//     updatedAt: "2024-12-04T21:16:46.326Z",
//   },
//   {
//     id: 5,
//     name: "Dedric",
//     surname: "Feeney-Kilback",
//     lastName: null,
//     contacts:
//       '[{"type":"email","email":"Hermann.Cassin@yahoo.com"},{"type":"phone","value":"283-789-7526 x55144"}]',
//     createdAt: "2024-12-04T21:16:46.327Z",
//     updatedAt: "2024-12-04T21:16:46.327Z",
//   },
//   {
//     id: 6,
//     name: "Easter",
//     surname: "Heathcote",
//     lastName: null,
//     contacts:
//       '[{"type":"email","email":"Lavonne.Deckow@gmail.com"},{"type":"phone","value":"(673) 575-0003 x362"}]',
//     createdAt: "2024-12-04T21:16:46.327Z",
//     updatedAt: "2024-12-04T21:16:46.327Z",
//   },
//   {
//     id: 7,
//     name: "Eden",
//     surname: "Welch",
//     lastName: null,
//     contacts:
//       '[{"type":"email","email":"Jovani_Muller-Ledner56@hotmail.com"},{"type":"phone","value":"(975) 230-3887 x722"}]',
//     createdAt: "2024-12-04T21:16:46.327Z",
//     updatedAt: "2024-12-04T21:16:46.327Z",
//   },
//   {
//     id: 8,
//     name: "Ilene",
//     surname: "Fay",
//     lastName: null,
//     contacts:
//       '[{"type":"email","email":"Cordia_Haag13@gmail.com"},{"type":"phone","value":"613-968-9632 x3487"}]',
//     createdAt: "2024-12-04T21:16:46.327Z",
//     updatedAt: "2024-12-04T21:16:46.327Z",
//   },
//   {
//     id: 9,
//     name: "Claudie",
//     surname: "Osinski",
//     lastName: null,
//     contacts:
//       '[{"type":"email","email":"Isom.Beier46@hotmail.com"},{"type":"phone","value":"1-207-740-1126 x8989"}]',
//     createdAt: "2024-12-04T21:16:46.328Z",
//     updatedAt: "2024-12-04T21:16:46.328Z",
//   },
//   {
//     id: 10,
//     name: "Roselyn",
//     surname: "Prosacco",
//     lastName: null,
//     contacts:
//       '[{"type":"email","email":"Immanuel33@gmail.com"},{"type":"phone","value":"798-277-9291 x23642"}]',
//     createdAt: "2024-12-04T21:16:46.328Z",
//     updatedAt: "2024-12-04T21:16:46.328Z",
//   },
// ];

// console.log(sortByDate(users, "createdAt", "desc"));
