exports.template = 
{
    "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
    "type": "AdaptiveCard",
    "version": "1.2",
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
                            "text": "",
                            "height": "stretch",
                            "maxLines": 8,
                            "fontType": "Monospace",
                            "size": "Medium",
                            "id": "board"
                        },
                        {
                            "type": "TextBlock",
                            "text": "-> New game",
                            "size": "Medium",
                            "weight": "Bolder",
                            "id": "status"
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
                                            "text": "White",
                                            "id": "toMove"
                                        },
                                        {
                                            "type": "TextBlock",
                                            "text": "☐",
                                            "id": "check"
                                        },
                                        {
                                            "type": "TextBlock",
                                            "text": "☐",
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
                                            "text": "White/long:",
                                            "horizontalAlignment": "Right"
                                        },
                                        {
                                            "type": "TextBlock",
                                            "text": "White/short:",
                                            "horizontalAlignment": "Right"
                                        },
                                        {
                                            "type": "TextBlock",
                                            "text": "Black/long:",
                                            "horizontalAlignment": "Right"
                                        },
                                        {
                                            "type": "TextBlock",
                                            "text": "Black/short:",
                                            "wrap": true,
                                            "horizontalAlignment": "Right"
                                        }
                                    ]
                                },
                                {
                                    "type": "Column",
                                    "width": "auto",
                                    "items": [
                                        {
                                            "type": "TextBlock",
                                            "text": "☑",
                                            "id": "whiteLong"
                                        },
                                        {
                                            "type": "TextBlock",
                                            "text": "☑",
                                            "id": "whiteShort"
                                        },
                                        {
                                            "type": "TextBlock",
                                            "text": "☑",
                                            "id": "blackLong"
                                        },
                                        {
                                            "type": "TextBlock",
                                            "text": "☑",
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
                                            "text": "From:",
                                            "horizontalAlignment": "Right"
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
                                            "placeholder": "e.g.: d2",
                                            "isRequired": true
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
                                            "text": "To:",
                                            "horizontalAlignment": "Right"
                                        }
                                    ]
                                },
                                {
                                    "type": "Column",
                                    "width": "stretch",
                                    "items": [
                                        {
                                            "type": "Input.Text",
                                            "id": "moveTo",
                                            "placeholder": "e.g.: d4"
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
                    "title": "Submit"
                }
            ],
            "horizontalAlignment": "Center"
        },
        {
            "type": "Input.Text",
            "id": "currentBoard",
            "isVisible": false,
            "value": ""
        }
    ]
};
