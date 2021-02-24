exports.chessCard = 
{
    "type": "AdaptiveCard",
    "version": "1.0",
    "body": [
        {
            "type": "ColumnSet",
            "columns": [
                {
                    "type": "Column",
                    "width": "stretch",
                    "items": [
                        {
                            "type": "TextBlock",
                            "text": "8 |r|n|b|q|k|b| |r|  \n\n7 |p|p|p|p|p|p|p|p|  \n\n6 |   |#|   |#|   |n|   |#|  \n\n5 |#|   |#|   |#|   |#|   |  \n\n4 |   |#|   |P|   |#|   |#|  \n\n3 |#|   |#|   |#|   |#|   |  \n\n2 |P|P|P|#|P|P|P|P|  \n\n1 |R|N|B|Q|K|B|N|R|  \n\n   ---a b c d e f g h",
                            "height": "stretch",
                            "maxLines": 8,
                            "fontType": "Monospace",
                            "size": "Medium",
                            "id": "board"
                        }
                    ]
                },
                {
                    "type": "Column",
                    "width": "stretch",
                    "items": [
                        {
                            "type": "ColumnSet",
                            "columns": [
                                {
                                    "type": "Column",
                                    "width": "stretch",
                                    "items": [
                                        {
                                            "type": "TextBlock",
                                            "text": "To move:"
                                        },
                                        {
                                            "type": "TextBlock",
                                            "text": "Check:"
                                        },
                                        {
                                            "type": "TextBlock",
                                            "text": "Checkmate:"
                                        }
                                    ]
                                },
                                {
                                    "type": "Column",
                                    "width": "stretch",
                                    "items": [
                                        {
                                            "type": "TextBlock",
                                            "text": "white",
                                            "id": "toMove"
                                        },
                                        {
                                            "type": "TextBlock",
                                            "text": "☐",
                                            "id": "check"
                                        },
                                        {
                                            "type": "TextBlock",
                                            "text": "false",
                                            "id": "checkMate"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "TextBlock",
                            "text": "Castling:"
                        },
                        {
                            "type": "ColumnSet",
                            "columns": [
                                {
                                    "type": "Column",
                                    "width": "stretch",
                                    "items": [
                                        {
                                            "type": "TextBlock",
                                            "text": "White/long:"
                                        },
                                        {
                                            "type": "TextBlock",
                                            "text": "White/short:"
                                        },
                                        {
                                            "type": "TextBlock",
                                            "text": "Black/long:"
                                        },
                                        {
                                            "type": "TextBlock",
                                            "text": "Black/short:"
                                        }
                                    ]
                                },
                                {
                                    "type": "Column",
                                    "width": "stretch",
                                    "items": [
                                        {
                                            "type": "TextBlock",
                                            "text": "☑",
                                            "id": "whiteLong"
                                        },
                                        {
                                            "type": "TextBlock",
                                            "text": "true",
                                            "id": "whiteShort"
                                        },
                                        {
                                            "type": "TextBlock",
                                            "text": "true",
                                            "id": "blackLong"
                                        },
                                        {
                                            "type": "TextBlock",
                                            "text": "false",
                                            "id": "blackShort"
                                        }
                                    ]
                                }
                            ]
                        }
                    ],
                    "separator": true
                }
            ]
        },
        {
            "type": "TextBlock",
            "text": "Enter your move",
            "separator": true,
            "weight": "Bolder",
            "size": "Medium"
        },
        {
            "type": "ColumnSet",
            "columns": [
                {
                    "type": "Column",
                    "width": "stretch",
                    "items": [
                        {
                            "type": "ColumnSet",
                            "columns": [
                                {
                                    "type": "Column",
                                    "width": "stretch",
                                    "items": [
                                        {
                                            "type": "TextBlock",
                                            "text": "From:"
                                        }
                                    ]
                                },
                                {
                                    "type": "Column",
                                    "width": "stretch",
                                    "items": [
                                        {
                                            "type": "Input.Text",
                                            "id": "moveFrom",
                                        }
                                    ]
                                }
                            ],
                            "separator": true
                        }
                    ]
                },
                {
                    "type": "Column",
                    "width": "stretch",
                    "items": [
                        {
                            "type": "ColumnSet",
                            "columns": [
                                {
                                    "type": "Column",
                                    "width": "stretch",
                                    "items": [
                                        {
                                            "type": "TextBlock",
                                            "text": "To:"
                                        }
                                    ]
                                },
                                {
                                    "type": "Column",
                                    "width": "stretch",
                                    "items": [
                                        {
                                            "type": "Input.Text",
                                            "id": "moveTo"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "type": "ActionSet",
            "actions": [
                {
                    "type": "Action.Submit",
                    "title": "Action.Submit"
                }
            ],
            "horizontalAlignment": "Center"
        }
    ],
    "$schema": "http://adaptivecards.io/schemas/adaptive-card.json"
}