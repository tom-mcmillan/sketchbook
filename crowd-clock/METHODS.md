# Model and method

## Computational question

Can locally coherent groups remain coupled without immediately sharing one collective cadence? This instrument makes that question computable under explicit, deliberately limited assumptions. It does not measure meaning, social cohesion, understanding, preference, or agreement.

## State and initialization

There are N = 256 phase oscillators. Oscillator i has phase θ_i and fixed natural angular speed ω_i. Time and speed units are model seconds and radians per model second.

A deterministic Mulberry32 generator is initialized from the displayed unsigned 32-bit seed. Each person receives an initial phase uniformly sampled over [0, 2π) and a natural-speed draw. The two models use the same initial phase draws for the same seed.

### Original all-to-all model

Natural speeds are uniform on [0.4, 1.6). With coupling K controlled from 0 to 4:

    dθ_i/dt = ω_i + (K/N) Σ_j sin(θ_j − θ_i)

The implementation evaluates this exactly through the population mean vector. It is the original solver, unchanged.

### Four-group model

Four fixed groups contain 64 consecutive oscillator indices each. Within each group, every distinct pair has an undirected connection: 4 × C(64, 2) = 8,064 internal edges. The per-edge weight is 2.4/64. Including the zero self-term in a group mean leaves the equation unchanged.

Groups form the ring A–B–C–D–A. For every adjacent group pair, member k connects to member k, for k = 0…63. There are 256 undirected cross-group bridges. Each oscillator has exactly two bridge neighbors. Every bridge has weight B/2. B is controlled from 0 to 4; the two convenience states are 0.08 and 1.2.

    dθ_i/dt = ω_i
             + (2.4/64) Σ_(j in group(i)) sin(θ_j − θ_i)
             + (B/2) Σ_(j in bridge-neighbors(i)) sin(θ_j − θ_i)

Within-group sums are evaluated exactly through group mean vectors. Each undirected bridge is evaluated explicitly and contributes equal-and-opposite coupling terms at its two endpoints. This is a full 256-oscillator model, not an Ott–Antonsen or other reduced-population approximation.

Natural-speed samples are transformed to four uniform bands:

| Group | Chosen band, rad/s |
|---|---:|
| A | [0.55, 0.85) |
| B | [0.75, 1.05) |
| C | [0.95, 1.25) |
| D | [1.15, 1.45) |

These different bands are an explicit design choice. They are not inferred from data. The slider does not change frequencies, topology, membership, or within-group weight. B = 0 switches off intergroup coupling while retaining each internal clique.

The two selectable models differ in both topology and natural-frequency distribution. They are two experiments, not a controlled comparison that isolates topology alone.

## Measurements

For any population or group S:

    Z_S = (1 / |S|) Σ_(j in S) exp(i θ_j)
    R_S = |Z_S|
    ψ_S = arg(Z_S)

R measures phase coherence on [0, 1]. A dial's direction is ψ_S, and its hand length is proportional to R_S. Group pace is the arithmetic mean of instantaneous dθ_i/dt in that group. It is not the derivative of the mean-phase angle, and it is not walking speed.

The small collective-rhythm trace is Re(Z_all) = R_all cos(ψ_all). It is an output, never an external beat or driver.

The amber individual's displayed adjustment is the actual derivative minus ω_i under the active equation. Nudge adds π to that phase. A high R at one instant does not prove sustained frequency locking. Low global R does not imply that every group is incoherent.

## Numerical method

Classical fourth-order Runge–Kutta uses a fixed step of 1/120 model second. All four derivative evaluations use the full current network equation. Phase wrapping preserves periodic dynamics. Hidden tabs pause; a cap on accumulated frame work slows model-time advancement on overloaded devices rather than enlarging the integrator step.

Replay restores seeded phases and frequencies at the current coupling. Changing models restarts from the same seed; each model's most recently selected coupling is retained when switching back.

## Reproducible example

Seed 1207; group internal strength 2.4. Each case begins from the same seeded state and runs for 90 model seconds. The reported means sample once per second after t > 60 and through the 60–90-second observation window.

| B | Mean group R | Mean whole-crowd R | Mean spread of group mean speeds |
|---:|---:|---:|---:|
| 0.08 | 0.999338 | 0.467533 | 0.599844 rad/s |
| 1.20 | 0.999645 | 0.983418 | about 5.5 × 10⁻¹⁵ rad/s |

In the stronger-bridge run, group mean speeds settle near 1.002532 rad/s. These finite numerical observations apply to this seed, topology, frequency construction, and parameter values. They are not universal thresholds or claims that greater coherence is desirable.

The checks also compare the optimized derivative against a direct weighted pairwise sum, verify two bridge neighbors per oscillator, check pairwise antisymmetry and population-mean frequency conservation, and confirm that perturbing one group cannot alter another group's derivative at B = 0. Step-halving and deterministic replay are checked separately. Full results are in `checks/network-verification.json`.

## Visual interpretation

The Dimes Square illustration and six-frame walking atlas are AI-generated. Routes follow composed sidewalks and crossings. Their positions, turns, pauses, facing direction, and spacing are deterministic staging; none enters either oscillator equation. Group membership is independent of location, route, clothing, and appearance.

The scene uses a single camera transform for the background, ground positions, shadows, and amber trail. The crop is 1.08× closer and biased toward the street. Adult heights are calibrated to doorway references at several illustration depths (approximately 26, 92, and 207 pixels at source ground rows 574, 655, and 881 in the 1024-pixel-high image), with continuous interpolation and small individual height variation. This is an illustration-based calibration, not a reconstructed or measured physical camera. Depth ordering and each sprite frame’s foot anchor are preserved. Slightly wider walking lanes and personal-space offsets make room for the corrected bodies without changing the routes or oscillator equations.

Four group colors mark membership. A person's footlight brightens once per oscillator cycle. Four sprite gait cycles are shown per oscillator cycle, and a short glow trail records recent position. The sprite may stand still while its oscillator keeps evolving. These conventions make timing visible; they are not a biomechanics or pedestrian simulation.

## Research context

- Arenas, A., Díaz-Guilera, A., & Pérez-Vicente, C. J. (2006). *Synchronization Reveals Topological Scales in Complex Networks*. Physical Review Letters 96, 114102. https://doi.org/10.1103/PhysRevLett.96.114102 . Author-hosted full text: https://webs-deim.urv.cat/~alexandre.arenas/publicacions/pdf/synchrocom.pdf
- Brede, M. (2008). *Locals vs. global synchronization in networks of non-identical Kuramoto oscillators*. European Physical Journal B 62, 87–94. https://link.springer.com/article/10.1140/epjb/e2008-00126-9 . The publisher's abstract was accessible; the full article was subscription-restricted.

The first paper motivates distinguishing synchronization at community and larger scales. The second distinguishes local from full-network synchronization in heterogeneous oscillator networks. This artwork borrows that question, not their graphs, empirical interpretations, thresholds, or quantitative results.
