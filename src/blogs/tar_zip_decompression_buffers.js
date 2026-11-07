export default {
  "slug": "tar-zip-decompression-buffers",
  "title": "Unpacking Custom Binary Archives via Buffers and Decompression",
  "description": "Bundle game mods, custom maps, and asset packs into single compressed binary container files, extracting individual assets on demand with buffer_decompress().",
  "category": "Memory & Performance",
  "categoryColor": "text-gm-purple",
  "readTime": "8 min read",
  "date": "April 2025",
  "tags": [
    "compression",
    "archives",
    "modding",
    "buffers",
    "file-io"
  ],
  "author": "GMS2Lab Team",
  "overview": "Distributing thousands of loose PNG and audio files triggers slow disk reads. Packing them into a single archive with an entry table allows loading and decompressing specific assets in milliseconds.",
  "sections": [
    {
      "id": "archive-extractor",
      "title": "1. Extracting Compressed File Blocks",
      "content": "Seek to file record, decompress raw zlib payload, and write to disk or RAM.",
      "code": "function archive_extract_asset(_archive_buf, _entry_offset, _entry_compressed_size) {\n    var _decompressed = buffer_decompress(_archive_buf, _entry_offset, _entry_compressed_size);\n    if (_decompressed != -1) {\n        return _decompressed; // Returns ready-to-use buffer\n    }\n    return -1;\n}"
    }
  ]
}
