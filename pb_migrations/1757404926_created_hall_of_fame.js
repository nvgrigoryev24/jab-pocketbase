/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = new Collection({
    "createRule": null,
    "deleteRule": null,
    "fields": [
      {
        "autogeneratePattern": "[a-z0-9]{15}",
        "hidden": false,
        "id": "text3208210256",
        "max": 15,
        "min": 15,
        "name": "id",
        "pattern": "^[a-z0-9]+$",
        "presentable": false,
        "primaryKey": true,
        "required": true,
        "system": true,
        "type": "text"
      },
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "text3817851971",
        "max": 100,
        "min": 5,
        "name": "athlete_name",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": true,
        "system": false,
        "type": "text"
      },
      {
        "hidden": false,
        "id": "select4211177941",
        "maxSelect": 2,
        "name": "sport_type",
        "presentable": false,
        "required": true,
        "system": false,
        "type": "select",
        "values": [
          "Бокс",
          "Кикбоксинг"
        ]
      },
      {
        "convertURLs": false,
        "hidden": false,
        "id": "editor3508698878",
        "maxSize": 0,
        "name": "achievements",
        "presentable": false,
        "required": true,
        "system": false,
        "type": "editor"
      },
      {
        "hidden": false,
        "id": "file347571224",
        "maxSelect": 1,
        "maxSize": 0,
        "mimeTypes": [
          "image/jpeg",
          "image/png",
          "image/svg+xml",
          "image/gif",
          "image/webp"
        ],
        "name": "photo",
        "presentable": false,
        "protected": false,
        "required": true,
        "system": false,
        "thumbs": [],
        "type": "file"
      },
      {
        "hidden": false,
        "id": "number2289690853",
        "max": 10,
        "min": 1,
        "name": "rank",
        "onlyInt": true,
        "presentable": false,
        "required": true,
        "system": false,
        "type": "number"
      },
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "text240882145",
        "max": 20,
        "min": 7,
        "name": "years_active",
        "pattern": "^\\d{4}-\\d{4}$|^\\d{4}-настоящее время$",
        "presentable": false,
        "primaryKey": false,
        "required": true,
        "system": false,
        "type": "text"
      },
      {
        "hidden": false,
        "id": "select2093596530",
        "maxSelect": 1,
        "name": "current_status",
        "presentable": false,
        "required": true,
        "system": false,
        "type": "select",
        "values": [
          "Активный",
          "Завершил карьеру",
          "Тренер"
        ]
      },
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "text973997400",
        "max": 200,
        "min": 0,
        "name": "special_mention",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": false,
        "system": false,
        "type": "text"
      },
      {
        "hidden": false,
        "id": "bool2847551440",
        "name": "is_featured",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "bool"
      },
      {
        "hidden": false,
        "id": "bool458715613",
        "name": "is_active",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "bool"
      },
      {
        "hidden": false,
        "id": "number1169138922",
        "max": 1000,
        "min": 1,
        "name": "sort_order",
        "onlyInt": true,
        "presentable": false,
        "required": true,
        "system": false,
        "type": "number"
      },
      {
        "hidden": false,
        "id": "autodate2990389176",
        "name": "created",
        "onCreate": true,
        "onUpdate": false,
        "presentable": false,
        "system": false,
        "type": "autodate"
      },
      {
        "hidden": false,
        "id": "autodate3332085495",
        "name": "updated",
        "onCreate": true,
        "onUpdate": true,
        "presentable": false,
        "system": false,
        "type": "autodate"
      }
    ],
    "id": "pbc_3439372263",
    "indexes": [],
    "listRule": "",
    "name": "hall_of_fame",
    "system": false,
    "type": "base",
    "updateRule": null,
    "viewRule": ""
  });

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3439372263");

  return app.delete(collection);
})
