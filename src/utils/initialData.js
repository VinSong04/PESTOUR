export const INITIAL_SETTINGS = {
    name: "PALLET EFOOTBALL",
    season: "Spring 2026",
    tagline: "Legends Start Here"
};

export const INITIAL_PLAYERS = [
    {
        "group": "A",
        "id": "A1",
        "name": "Dra-Gon"
    },
    {
        "group": "A",
        "id": "A2",
        "name": "Jak-Kroval"
    },
    {
        "group": "A",
        "id": "A3",
        "name": "Max-88"
    },
    {
        "group": "A",
        "id": "A4",
        "name": "Petter-027"
    },
    {
        "group": "B",
        "id": "B1",
        "name": "MengZzz"
    },
    {
        "group": "B",
        "id": "B2",
        "name": "Reach OMG"
    },
    {
        "group": "B",
        "id": "B3",
        "name": "Si Dav"
    },
    {
        "group": "B",
        "id": "B4",
        "name": "SO-R3spec1"
    },
    {
        "group": "C",
        "id": "C1",
        "name": "1AUTO1"
    },
    {
        "group": "C",
        "id": "C2",
        "name": "Glanelalala"
    },
    {
        "group": "C",
        "id": "C3",
        "name": "Win Me Lbey"
    },
    {
        "group": "C",
        "id": "C4",
        "name": "K-Vinn"
    }
];

export const INITIAL_MATCHES = [
    {
        "id": "M-A1",
        "groupId": "A",
        "p1Id": "A1",
        "p2Id": "A2",
        "played": false,
        "g1": {
            "p1": null,
            "p2": null
        },
        "g2": {
            "p1": null,
            "p2": null
        },
        "g3": {
            "p1": null,
            "p2": null
        }
    },
    {
        "id": "M-A2",
        "groupId": "A",
        "p1Id": "A3",
        "p2Id": "A4",
        "played": true,
        "g1": {
            "p1": 3,
            "p2": 1
        },
        "g2": {
            "p1": 2,
            "p2": 0
        },
        "g3": {
            "p1": null,
            "p2": null
        }
    },
    {
        "id": "M-A3",
        "groupId": "A",
        "p1Id": "A1",
        "p2Id": "A3",
        "played": true,
        "g1": {
            "p1": 3,
            "p2": 0
        },
        "g2": {
            "p1": 3,
            "p2": 1
        },
        "g3": {
            "p1": null,
            "p2": null
        }
    },
    {
        "id": "M-A4",
        "groupId": "A",
        "p1Id": "A2",
        "p2Id": "A4",
        "played": true,
        "g1": {
            "p1": 5,
            "p2": 4
        },
        "g2": {
            "p1": 1,
            "p2": 6
        },
        "g3": {
            "p1": 1,
            "p2": 4
        }
    },
    {
        "id": "M-A5",
        "groupId": "A",
        "p1Id": "A1",
        "p2Id": "A4",
        "played": true,
        "g1": {
            "p1": 3,
            "p2": 1
        },
        "g2": {
            "p1": 7,
            "p2": 2
        },
        "g3": {
            "p1": null,
            "p2": null
        }
    },
    {
        "id": "M-A6",
        "groupId": "A",
        "p1Id": "A2",
        "p2Id": "A3",
        "played": true,
        "g1": {
            "p1": 1,
            "p2": 3
        },
        "g2": {
            "p1": 3,
            "p2": 7
        },
        "g3": {
            "p1": null,
            "p2": null
        }
    },
    {
        "id": "M-B1",
        "groupId": "B",
        "p1Id": "B1",
        "p2Id": "B2",
        "played": true,
        "g1": {
            "p1": 6,
            "p2": 5
        },
        "g2": {
            "p1": 1,
            "p2": 8
        },
        "g3": {
            "p1": 1,
            "p2": 6
        }
    },
    {
        "id": "M-B2",
        "groupId": "B",
        "p1Id": "B3",
        "p2Id": "B4",
        "played": true,
        "g1": {
            "p1": 2,
            "p2": 5
        },
        "g2": {
            "p1": 2,
            "p2": 4
        },
        "g3": {
            "p1": null,
            "p2": null
        }
    },
    {
        "id": "M-B3",
        "groupId": "B",
        "p1Id": "B1",
        "p2Id": "B3",
        "played": true,
        "g1": {
            "p1": 1,
            "p2": 4
        },
        "g2": {
            "p1": 0,
            "p2": 5
        },
        "g3": {
            "p1": null,
            "p2": null
        }
    },
    {
        "id": "M-B4",
        "groupId": "B",
        "p1Id": "B2",
        "p2Id": "B4",
        "played": true,
        "g1": {
            "p1": 2,
            "p2": 1
        },
        "g2": {
            "p1": 0,
            "p2": 3
        },
        "g3": {
            "p1": 9,
            "p2": 3
        }
    },
    {
        "id": "M-B5",
        "groupId": "B",
        "p1Id": "B1",
        "p2Id": "B4",
        "played": true,
        "g1": {
            "p1": 1,
            "p2": 4
        },
        "g2": {
            "p1": 0,
            "p2": 5
        },
        "g3": {
            "p1": null,
            "p2": null
        }
    },
    {
        "id": "M-B6",
        "groupId": "B",
        "p1Id": "B2",
        "p2Id": "B3",
        "played": true,
        "g1": {
            "p1": 1,
            "p2": 3
        },
        "g2": {
            "p1": 2,
            "p2": 3
        },
        "g3": {
            "p1": null,
            "p2": null
        }
    },
    {
        "id": "M-C1",
        "groupId": "C",
        "p1Id": "C1",
        "p2Id": "C2",
        "played": true,
        "g1": {
            "p1": 1,
            "p2": 3
        },
        "g2": {
            "p1": 1,
            "p2": 5
        },
        "g3": {
            "p1": null,
            "p2": null
        }
    },
    {
        "id": "M-C2",
        "groupId": "C",
        "p1Id": "C3",
        "p2Id": "C4",
        "played": true,
        "g1": {
            "p1": 7,
            "p2": 4
        },
        "g2": {
            "p1": 0,
            "p2": 5
        },
        "g3": {
            "p1": 4,
            "p2": 6
        }
    },
    {
        "id": "M-C3",
        "groupId": "C",
        "p1Id": "C1",
        "p2Id": "C3",
        "played": true,
        "g1": {
            "p1": 0,
            "p2": 3
        },
        "g2": {
            "p1": 0,
            "p2": 3
        },
        "g3": {
            "p1": null,
            "p2": null
        }
    },
    {
        "id": "M-C4",
        "groupId": "C",
        "p1Id": "C2",
        "p2Id": "C4",
        "played": true,
        "g1": {
            "p1": 7,
            "p2": 3
        },
        "g2": {
            "p1": 3,
            "p2": 5
        },
        "g3": {
            "p1": 3,
            "p2": 1
        }
    },
    {
        "id": "M-C5",
        "groupId": "C",
        "p1Id": "C1",
        "p2Id": "C4",
        "played": true,
        "g1": {
            "p1": 4,
            "p2": 5
        },
        "g2": {
            "p1": 3,
            "p2": 4
        },
        "g3": {
            "p1": null,
            "p2": null
        }
    },
    {
        "id": "M-C6",
        "groupId": "C",
        "p1Id": "C2",
        "p2Id": "C3",
        "played": true,
        "g1": {
            "p1": 2,
            "p2": 5
        },
        "g2": {
            "p1": 5,
            "p2": 4
        },
        "g3": {
            "p1": 4,
            "p2": 5
        }
    }
];

export const INITIAL_DATA = {
    settings: INITIAL_SETTINGS,
    players: INITIAL_PLAYERS,
    matches: INITIAL_MATCHES,
    bracket: [
        {
            "id": "QF-1",
            "round": "QF",
            "p1Id": "B4",
            "p1Name": "SO-R3spec1",
            "p2Id": "A3",
            "p2Name": "Max-88",
            "played": false,
            "g1": {
                "p1": null,
                "p2": null
            },
            "g2": {
                "p1": null,
                "p2": null
            },
            "g3": {
                "p1": null,
                "p2": null
            }
        },
        {
            "id": "QF-2",
            "round": "QF",
            "p1Id": "C2",
            "p1Name": "Glanelalala",
            "p2Id": "B3",
            "p2Name": "Si Dav",
            "played": false,
            "g1": {
                "p1": null,
                "p2": null
            },
            "g2": {
                "p1": null,
                "p2": null
            },
            "g3": {
                "p1": null,
                "p2": null
            }
        },
        {
            "id": "QF-3",
            "round": "QF",
            "p1Id": "B2",
            "p1Name": "Reach OMG",
            "p2Id": "C3",
            "p2Name": "Win Me Lbey",
            "played": false,
            "g1": {
                "p1": null,
                "p2": null
            },
            "g2": {
                "p1": null,
                "p2": null
            },
            "g3": {
                "p1": null,
                "p2": null
            }
        },
        {
            "id": "QF-4",
            "round": "QF",
            "p1Id": "A1",
            "p1Name": "Dra-Gon",
            "p2Id": "C4",
            "p2Name": "K-Vinn",
            "played": false,
            "g1": {
                "p1": null,
                "p2": null
            },
            "g2": {
                "p1": null,
                "p2": null
            },
            "g3": {
                "p1": null,
                "p2": null
            }
        }
    ]
};
