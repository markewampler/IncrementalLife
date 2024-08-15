export const skills = [
    // Skills for Peasant
    {
    id: 1,
    name: 'Farming',
    effects: { STR: 4, DEX: 2, STA: 6, WIS: 1.5 },
    multipliers: { STR: 2, DEX: 1, STA: 2 },
    learningTime: 2500,
    classDependency: ['Peasant'],
    attributeDependency: { STR: 10, STA: 10 },
    locationDependency: ['Forest','Rural', 'Village'],
    moneyEarned: 30,
    itemDependency: 'Farming Implements'
    },
    {
    id: 2,
    name: 'Animal Husbandry',
    effects: { STR: 1, STA: 1, INT: 0.2, WIS: 0.5 },
    multipliers: { INT: 1, STA: 2, STR: 1, WIS: 1 },
    learningTime: 700,
    classDependency: ['Peasant','Page'],
    attributeDependency: { WIS: 10 },
    locationDependency: ['Rural', 'Village','Town','City'],
    moneyEarned: 5,
    itemDependency: 'Curry Comb'
    },
    {
    id: 3,
    name: 'Hunting',
    effects: { STR: 0.3, DEX: 1.2, STA: 2.3, INT: 0.1, WIS: 0.3  },
    multipliers: { DEX: 1, WIS: 1, STA: 2 },
    learningTime: 1000,
    classDependency: ['Peasant', 'Hunter'],
    attributeDependency: { DEX: 10, STA: 10 },
    locationDependency: ['Rural', 'Village', 'Forest'],
    moneyEarned: 20,
    itemDependency: 'Bow'
    },
    {
    id: 4,
    name: 'Construction',
    effects: { STR: 1, STA: 1, WIS: 0.5, INT: 0.2 },
    multipliers: { STR: 0.5, STA: 0.5, WIS: 0.5 },
    learningTime: 1500,
    classDependency: ['Peasant'],
    attributeDependency: { DEX: 5 },
    locationDependency: ['Rural', 'Village', 'Forest'],
    moneyEarned: 20,
    itemDependency: 'Construction Tools'
    },
    {
    id: 5,
    name: 'Street Sweeping',
    effects: { STR: 0.5, STA: 1 },
    multipliers: { STR: 1, STA: 1 },
    learningTime: 500,
    classDependency: ['Peasant'],
    attributeDependency: { STR: 10, STA: 10 },
    locationDependency: ['Town','City'],
    moneyEarned: 5,
    itemDependency: null
    },
 
    // Skills for Mage
    {
    id: 6,
    name: 'Spell Casting',
    effects: { INT: 2, WIS: 0.5, CHA: 0.2 },
    multipliers: { INT: 1 },
    learningTime: 600,
    classDependency: ['Mage', 'Battle Mage'],
    attributeDependency: { INT: 30, WIS: 10 },
    locationDependency: [],
    moneyEarned: 30,
    itemDependency: 'Spellbook'
    },
    {
    id: 7,
    name: 'Gather Arcane Knowledge',
    effects: { INT: 4, WIS: 4 },
    multipliers: { INT: 3, WIS: 3 },
    learningTime: 1000,
    classDependency: ['Mage', 'Battle Mage'],
    attributeDependency: { INT: 8, WIS: 10 },
    locationDependency: ['Mage Tower', 'City'],
    moneyEarned: 0,
    itemDependency: 'Spellbook'
    },
 
    // Skills for Knight
    {
    id: 8,
    name: 'Swordsmanship Practice',
    effects: { STR: 3, DEX: 1, STA: 2.5 },
    multipliers: { STR: 1, DEX: 0.5, STA: 1 },
    learningTime: 1500,
    classDependency: ['Knight', 'Squire'],
    attributeDependency: { STR: 40, DEX: 25 },
    locationDependency: [],
    moneyEarned: 5,
    itemDependency: 'Sword'
    },
    {
    id: 9,
    name: 'Chivalric Deeds',
    effects: { STR: 0.5, INT: 0.3, WIS: 0.5, CHA: 3 },
    multipliers: { STR: 0.2, INT: 0.3, WIS: 0.5, CHA: 3 },
    learningTime: 1000,
    classDependency: ['Knight', 'Squire'],
    attributeDependency: { CHA: 10 },
    locationDependency: [],
    moneyEarned: 5,
    itemDependency: null
    },
 
    {
    id: 10,
    name: 'Mushroom Gathering',
    effects: { STA: 0.5, DEX: 0.2, WIS: 1 },
    multipliers: { STA: 0.5, DEX: 0.5, WIS: 1 },
    learningTime: 200,
    classDependency: ['Peasant'],
    attributeDependency: { DEX: 5, STA: 10 },
    locationDependency: ['Rural', 'Village', 'Forest'],
    moneyEarned: 2,
    itemDependency: null
    },
 
    // Skills for Squire
    {
        id: 11,
        name: 'Honing Sword Edge',
        effects: { STR: 1, DEX: 4, STA: 3, WIS: 1 },
        multipliers: { STR: 0.5, DEX: 1.5, STA: 1.5, WIS: 0.5 },
        learningTime: 1500,
        classDependency: ['Page', 'Squire'],
        attributeDependency: { STA: 30, DEX: 40, WIS: 25 },
        locationDependency: [],
        moneyEarned: 25,
        itemDependency: 'Whetstone'
        },
        {
        id: 12,
        name: 'Polishing Armor',
        effects: { STR: 0.5, DEX: 0.3, STA: 2 },
        multipliers: { STR: 1, DEX: 0.5, STA: 2 },
        learningTime: 700,
        classDependency: ['Page', 'Squire'],
        attributeDependency: { STA: 30, DEX: 25, WIS: 10 },
        locationDependency: [],
        moneyEarned: 10,
        itemDependency: 'Oil and Rag'
        },
        {
        id: 13,
        name: 'Trapping',
        effects: { STR: 0.5, DEX: 0.5, STA: 1, INT: 0.5, WIS: 1.5  },
        multipliers: { DEX: 0.5, WIS: 1, STA: 1 },
        learningTime: 1000,
        classDependency: ['Peasant', 'Hunter'],
        attributeDependency: { DEX: 10, STA: 10 },
        locationDependency: ['Rural', 'Forest'],
        moneyEarned: 50,
        itemDependency: 'Traps'
        },
        {
        id: 14,
        name: 'Transport Trade Goods',
        effects: { STA: 0.5, INT: 0.5, WIS: 1.5  },
        multipliers: { INT: 0.5, WIS: 1, STA: 1 },
        learningTime: 1000,
        classDependency: ['Merchant'],
        attributeDependency: { INT: 10, WIS: 10 },
        locationDependency: [],
        moneyEarned: 50,
        itemDependency: 'Wagon'
        },
        {
        id: 15,
        name: 'Barter',
        effects: { INT: 1.5, WIS: 2.5, CHA: 1 },
        multipliers: { INT: 1.5, WIS: 2, CHA: 1 },
        learningTime: 1000,
        classDependency: ['Merchant'],
        attributeDependency: { INT: 10, WIS: 10 },
        locationDependency: [],
        moneyEarned: 30,
        itemDependency: null
        },
        {
            id: 16,
            name: 'Craft Magic Scroll',
            effects: { DEX: 0.5, STA: 0.5, INT: 2, WIS: 2 },
            multipliers: { DEX: 0.5, STA: 0.5, INT: 3, WIS: 3 },
            learningTime: 1500,
            classDependency: ['Mage'],
            attributeDependency: { INT: 10, WIS: 10 },
            locationDependency: ['Town','Mage Tower', 'City'],
            moneyEarned: 100,
            itemDependency: 'Spellbook'
        },
        {
            id: 17,
            name: 'Herb Gathering',
            effects: { STA: 0.2, DEX: 0.4, WIS: 0.7 },
            multipliers: { STA: 0.5, DEX: 0.5, WIS: 1 },
            learningTime: 200,
            classDependency: ['Peasant'],
            attributeDependency: { DEX: 10, STA: 10 },
            locationDependency: ['Rural', 'Village', 'Forest'],
            moneyEarned: 3,
            itemDependency: null
        },
        {
            id: 18,
            name: 'Knife Fighting Techniques',
            effects: { STR: 0.2, DEX: 3, STA: 1.2 },
            multipliers: { STR: 0.2, DEX: 3, STA: 1 },
            learningTime: 1500,
            classDependency: ['Knight', 'Squire', 'Page'],
            attributeDependency: { STR: 10, DEX: 10 },
            locationDependency: [],
            moneyEarned: 5,
            itemDependency: 'Knife'
        },
        {
        id: 19,
        name: 'Questing for Treasure',
        effects: { STR: 5, STA: 10, INT: 1, WIS: 1 },
        multipliers: { STR: 5, STA: 3, INT: 0.3, WIS: 0.5 },
        learningTime: 2000,
        classDependency: ['Knight'],
        attributeDependency: { STR: 10 },
        locationDependency: [],
        moneyEarned: 100,
        itemDependency: null
        }
 
];
 
 
export const locations = {
    Forest: {
        cost: 0,
        requiresClassDependency: false,
        classDependencies: [],
        divinePointCost: 0,
    },
    Rural: {
        cost: 10,
        requiresClassDependency: false,
        classDependencies: [],
        divinePointCost: 5,
    },
    Village: {
        cost: 20,
        requiresClassDependency: false,
        classDependencies: [],
        divinePointCost: 10,
    },
    Town: {
        cost: 30,
        requiresClassDependency: false,
        classDependencies: [],
        divinePointCost: 15,
    },
    City: {
        cost: 40,
        requiresClassDependency: true,
        classDependencies: [],
        divinePointCost: 20,
    },
    MageTower: {
        cost: 50,
        requiresClassDependency: true,
        classDependencies: ['Mage', 'Battle Mage'],
        divinePointCost: 30,
    },
    Castle: {
        cost: 60,
        requiresClassDependency: true,
        classDependencies: ['Page', 'Squire', 'Knight', 'Nobility', 'Royalty'],
        divinePointCost: 50,
    },
    Capital: {
        cost: 70,
        requiresClassDependency: true,
        classDependencies: ['Page', 'Squire', 'Knight', 'Battle Mage', 'Nobility', 'Royalty'],
        divinePointCost: 100,
    }
};
 
 
export const classes = [
    {
    name: 'Peasant',
    locationDependency: [],
    attributeDependencies: []
    },
    {
    name: 'Page',
    locationDependency: ['Rural','Village','Town','City','Castle', 'Capital'],
    attributeDependencies: [
        { attribute: 'STR', value: 15 },
        { attribute: 'STA', value: 15 }
    ]
    },
    {
    name: 'Squire',
    locationDependency: ['Town','City','Castle', 'Capital'],
    attributeDependencies: [
        { attribute: 'STR', value: 35 },
        { attribute: 'STA', value: 35 }
    ]
    },
    {
    name: 'Knight',
    locationDependency: ['Castle', 'Capital'],
    attributeDependencies: [
        { attribute: 'STR', value: 50 },
        { attribute: 'STA', value: 50 }
    ]
    },
    {
    name: 'Mage',
    locationDependency: ['Mage Tower', 'City'],
    attributeDependencies: [
        { attribute: 'INT', value: 100 },
        { attribute: 'WIS', value: 50 }
    ]
    },
    {
    name: 'Battle Mage',
    locationDependency: ['Mage Tower', 'Capital'],
    attributeDependencies: [
        { attribute: 'INT', value: 120 },
        { attribute: 'WIS', value: 70 },
        { attribute: 'STR', value: 50 }
    ]
    },
    {
    name: 'Merchant',
    locationDependency: ['Village', 'Town', 'City'],
    attributeDependencies: []
    },
    {
    name: 'Nobility',
    locationDependency: ['Capital', 'Castle'],
    attributeDependencies: [
        { attribute: 'CHA', value: 80 }
    ]
    },
    {
    name: 'Royalty',
    locationDependency: ['Capital', 'Castle'],
    attributeDependencies: [
        { attribute: 'CHA', value: 100 }
    ]
    }
];
 
export const items = [
    { name: 'Farming Implements',
        cost: 50,
        divinePointCost: 5,
        locationDependency: ['Forest','Rural','Village']
    },
    { name: 'Oil and Rag',
        cost: 30,
        divinePointCost: 3,
        locationDependency: ['Rural','Village','Town','City','Castle', 'Capital']
    },
    { name: 'Wagon',
        cost: 300,
        divinePointCost: 30,
        locationDependency: ['Rural','Village','Town','City','Castle', 'Capital']
    },
    { name: 'Bow',
        cost: 50,
        divinePointCost: 5,
        locationDependency: ['Rural','Village','Town','City','Castle', 'Capital']
    },
    { name: 'Traps',
        cost: 100,
        divinePointCost: 10,
        locationDependency: ['Rural','Village','Town','City','Castle', 'Capital']
    },
    { name: 'Whetstone',
        cost: 40,
        divinePointCost: 4,
        locationDependency: ['Rural','Village','Town','City','Castle', 'Capital']
    },
    { name: 'Curry Comb',
        cost: 10,
        divinePointCost: 1,
        locationDependency: ['Rural','Village','Town','City','Castle', 'Capital']
    },
    { name: 'Knife',
        cost: 50,
        divinePointCost: 5,
        locationDependency: ['Rural','Village','Town','City','Castle', 'Capital']
    },
    { name: 'Sword',
        cost: 200,
        divinePointCost: 20,
        locationDependency: ['Rural','Village','Town','City','Castle', 'Capital']
    },
    { name: 'Construction Tools',
        cost: 50,
        divinePointCost: 5,
        locationDependency: ['Rural','Village','Town','City','Castle', 'Capital']
    },
    { name: 'Spellbook',
        cost: 1000,
        divinePointCost: 100,
        locationDependency: ['MageTower']
    },
    { name: 'Manor',
        cost: 3000,
        divinePointCost: 300,
        locationDependency: ['Capital']
    }
];