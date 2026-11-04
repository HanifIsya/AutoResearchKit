"""CONTOH SINTETIS — optimizer PSO mini untuk demo struktur input AutoResearchKit.
Data 100% buatan. Jalankan: python demo_optimizer.py
"""
import numpy as np, pandas as pd, os

SEED = 7
DIM = 6
N_PART = 30
N_ITER = 50

def fitness(pos, target):
    """Penalti relatif terhadap target sintetis; 0 = sempurna."""
    return float(np.sum(np.abs(pos - target) / np.maximum(target, 1e-9)))

def main():
    rng = np.random.RandomState(SEED)
    df = pd.read_csv(os.path.join(os.path.dirname(__file__), "demo_dataset.csv"))
    target = df["target"].to_numpy()          # 6 dimensi target
    lo, hi = df["min"].to_numpy(), df["max"].to_numpy()

    pos = rng.uniform(lo, hi, (N_PART, DIM))
    vel = np.zeros_like(pos)
    pbest, pbest_f = pos.copy(), np.array([fitness(p, target) for p in pos])
    gbest_i = int(np.argmin(pbest_f))
    gbest, gbest_f = pbest[gbest_i].copy(), pbest_f[gbest_i]

    print(f"Demo PSO sintetis | partikel={N_PART} iterasi={N_ITER} dim={DIM}")
    for it in range(N_ITER):
        w = 0.9 - (0.9 - 0.4) * it / N_ITER
        r1, r2 = rng.rand(N_PART, DIM), rng.rand(N_PART, DIM)
        vel = w * vel + r1 * (pbest - pos) + r2 * (gbest - pos)
        vel = np.clip(vel, -0.2 * (hi - lo), 0.2 * (hi - lo))   # velocity clamp
        pos = np.clip(pos + vel, lo, hi)
        f = np.array([fitness(p, target) for p in pos])
        upd = f < pbest_f
        pbest[upd], pbest_f[upd] = pos[upd], f[upd]
        if pbest_f.min() < gbest_f:
            gbest_f, gbest = pbest_f.min(), pbest[int(np.argmin(pbest_f))].copy()
        if (it + 1) % 10 == 0:
            print(f"  iter {it+1:3d} | gbest fitness={gbest_f:.4f}")
    print(f"selesai | fitness akhir={gbest_f:.4f} | posisi={np.round(gbest, 2).tolist()}")

if __name__ == "__main__":
    main()
