# Sketchbook

Interactive computational sketches by Tom McMillan.

**Gallery:** https://tom-mcmillan.github.io/sketchbook/

**Current experiment:** https://tom-mcmillan.github.io/sketchbook/crowd-clock/

## What a connection makes possible

Can groups keep their own rhythms and still be connected? This experiment follows 256 phase oscillators, staged as fictional people walking through an AI-generated illustration of Dimes Square.

The **Four connected groups** model starts with weak bridges, B = 0.08. Let the four groups find their cadence, then choose **Strengthen bridges**, turn bridges off, or **Nudge one** person. The **Original whole-crowd model** preserves the earlier all-to-all experiment. Replay and seed controls support repeatable exploration.

Both models, the six-frame gait, and the latest doorway-calibrated human scale are preserved from the current portable package. The experiment HTML and its two illustrations were copied unchanged.

## Run locally

Open `index.html` in a modern browser, or serve the repository:

```sh
python3 -m http.server 8000
```

Visit `http://localhost:8000/` for the gallery or `http://localhost:8000/crowd-clock/` for the experiment. No build step, package installation, API, runtime CDN, account, or server-side application is required.

## Model boundaries

The page computes phase coherence and instantaneous angular speeds. It does not measure belonging, agreement, understanding, social wellbeing, or pedestrian behavior. Walking locations and appearance never determine coupling or group membership. Stronger synchronization carries no value judgment.

The two selectable models differ in both topology and frequency distribution; their comparison does not isolate topology. The illustrated setting is not a measured streetscape. Detailed equations, initialization, numerical methods, visual calibration, research context, and limitations are in [METHODS.md](crowd-clock/METHODS.md) and the page’s methods disclosure.

## Computational checks

Node.js is needed only to run the existing tests. They use built-in modules:

```sh
cd crowd-clock
node checks/verify.cjs
node checks/verify-network.cjs
node checks/verify-paths.cjs
node checks/verify-perspective.cjs
```

The checks cover the original solver, explicit network adjacency, seeded replay, conservation of population mean frequency, disconnected-group independence, fourth-order step-size agreement, deterministic paths, shared camera projection, and the corrected scale. They write reports to the current directory. Publication-time reports are stored in `crowd-clock/checks/`.

## GitHub Pages publication

GitHub Pages publishes the root of the `main` branch using **Deploy from a branch**. The empty `.nojekyll` file disables Jekyll processing. Push static changes to `main`, then check the Pages build and the public URLs. No custom Actions workflow or build framework is needed.

All local asset links are relative, including under `/sketchbook/crowd-clock/`, so the project subpath works without a domain-root rewrite. Only the gallery, this experiment, public model notes, and computational checks are included in this repository.

## Reuse

No open-source license has been selected. Publication does not grant an additional reuse license. The background and fictional sprite atlas are AI-generated illustrations.
