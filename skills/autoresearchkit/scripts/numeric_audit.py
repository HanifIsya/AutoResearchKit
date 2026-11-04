"""Audit angka: bandingkan angka-angka yang dikutip di naskah dengan sumber OBSERVED (JSON/CSV).
Usage: python numeric_audit.py <hasil_audit.json>  — keluar: daftar mismatch (harus kosong)."""
import json, sys, re

def audit(claim_path, source_path):
    claims = json.load(open(claim_path, encoding="utf-8"))   # {"label": angka_yang_ditulis_di_naskah}
    source = json.load(open(source_path, encoding="utf-8"))  # {"label": angka_dari_data_observed}
    rows = []
    for label, expected in source.items():
        got = claims.get(label)
        ok = got is not None and abs(float(got) - float(expected)) <= 1e-6 * max(1.0, abs(float(expected)))
        rows.append((label, expected, got, "OK" if ok else "MISMATCH"))
    return rows

if __name__ == "__main__":
    bad = 0
    for label, exp, got, status in audit(sys.argv[1], sys.argv[2]):
        print(f"{status:9s} {label:40s} sumber={exp} naskah={got}")
        bad += status == "MISMATCH"
    sys.exit(1 if bad else 0)
