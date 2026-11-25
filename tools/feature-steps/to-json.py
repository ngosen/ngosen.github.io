"""Joins the driver's output with the example ids; keeps the Gõ Sen runs."""
import json
import sys

ids = [line.split("\t")[0] for line in open(sys.argv[1], encoding="utf-8") if line.strip() and not line.startswith("#")]
runs = [json.loads(line) for line in sys.stdin if line.strip()]
sen = [run for run in runs if run["mode"] == "sen"]
assert len(sen) == len(ids), (len(sen), len(ids))
out = {"version": sys.argv[2], "examples": {}}
for example_id, run in zip(ids, sen):
    out["examples"][example_id] = {"keys": run["keys"], "steps": run["steps"], "final": run["final"]}
json.dump(out, sys.stdout, ensure_ascii=False, indent=2)
sys.stdout.write("\n")
