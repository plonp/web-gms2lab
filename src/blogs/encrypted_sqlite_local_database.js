export default {
  "slug": "encrypted-sqlite-local-database",
  "title": "Querying Local SQLite Databases in GML for Deep RPG Item Catalogs",
  "description": "Manage 5,000+ item definitions, dialogue trees, and quest conditions using relational SQLite database queries inside GameMaker.",
  "category": "Platform & Tooling",
  "categoryColor": "text-gm-orange",
  "readTime": "8 min read",
  "date": "April 2025",
  "tags": [
    "sqlite",
    "database",
    "rpg",
    "data",
    "architecture"
  ],
  "author": "GMS2Lab Team",
  "overview": "Hardcoding thousands of weapon stats and quest branches in GML scripts slows compilation. Storing data in a local SQLite file allows relational querying with SELECT * WHERE type = \"sword\" AND level <= 10.",
  "sections": [
    {
      "id": "sqlite-query-pattern",
      "title": "1. Structured Data Queries",
      "content": "Extract item records via structured query wrappers.",
      "code": "function db_get_items_by_rarity(_rarity) {\n    var _sql = \"SELECT id, name, power FROM items WHERE rarity = '\" + _rarity + \"' ORDER BY power DESC\";\n    return db_execute_query(_sql); // Returns array of item structs\n}"
    }
  ]
}
