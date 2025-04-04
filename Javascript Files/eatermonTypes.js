const eatermonTypes =  [
    {
        id: 0, 
        type: "Fire",
        weak: ["Water"],
        strong: ["Grass", "Ice"],
        noEffect: []
    },
    {
        id: 1, 
        type: "Water",
        weak: ["Grass"],
        strong: ["Fire"],
        noEffect: []
    },
    {
        id: 2, 
        type: "Grass",
        weak: ["Fire"],
        strong: ["Water"],
        noEffect: []
    }, 
    {
        id: 3,
        type: "Ice",
        weak: ["Fire"],
        strong: ["Grass"],
        noEffect: []
    },
    {
        id: 4, 
        type: "Normal",
        weak: ["Fighting"],
        strong: [],
        noEffect: []
    },
    {
        id: 5,
        type: "Fighting",
        weak: [],
        strong: ["Normal"],
        noEffect: []
    },
    {
        id: 6, 
        type: "Poison",
        weak: [],
        strong: [], 
        noEffect: []
    },
    {
        id: 7, 
        type: "Flying",
        weak: [],
        strong: [],
        noEffect: []
    },
    {
        id: 8, 
        type: "Crisp",
        weak: ["Water", "Fire"],
        strong: ["Fighting"],
        noEffect: ["Poison"]
    },
    {
        id: 9, 
        type: "Ground",
        weak: ["Water", "Fighting", "Ice", "Grass"],
        strong: ["Flying", "Fire"],
        noEffect: []
    },
    {
        id: 10, 
        type: "Sticky",
        weak: ["Water"],
        strong: ["Ground","Flying"],
        noEffect: []
    },
    {
        id: 11,
        type: "Sweet",
        weak: ["Fire", "Sour", "Fighting"],
        strong: ["Salty", "Normal"]
    },
    {
        id: 12,
        type: "Sour",
        weak: ["Water", "Fighting", "Sour"],
        strong: ["Sweet"]
    },
    {
        id: 13,
        type: "Salty",
        weak: ["Grass", "Fighting", "Sweet"],
        strong: ["Sour"]
    }
    
]


