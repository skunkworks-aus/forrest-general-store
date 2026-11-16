"""Joins the source parts in src/ into index.html. Run: python3 build.py"""
from pathlib import Path
src = Path(__file__).parent / "src"
head = (src / "head.html").read_text()
scene = "".join((src / f).read_text() for f in ["p1.js", "p2.js", "p3.js", "p4.js"])
info = (src / "info.js").read_text()
out = head + "\n<script>\n" + scene + "</script>\n<script>" + info + "</script>\n</body>\n</html>\n"
(Path(__file__).parent / "index.html").write_text(out)
print("index.html written,", len(out), "bytes")
