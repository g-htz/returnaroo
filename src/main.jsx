import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Search,
  MapPin,
  Plus,
  X,
  Camera,
  ShieldCheck,
  Heart,
  PackageCheck,
  ChevronRight,
  SlidersHorizontal,
  Clock3,
  MessageCircle,
  CheckCircle2,
  MapPinned,
  Sparkles,
  Menu
} from "lucide-react";

import "./styles.css";

const seedItems = [
  {
    id: 1,
    type: "found",
    title: "Black leather wallet",
    category: "Wallets",
    suburb: "Surry Hills, NSW",
    date: "15 Jul 2026",
    description:
      "Found near the light rail stop. Tell me the initials on the licence.",
    image:
      "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=1000&q=80",
    verified: true
  },
  {
    id: 2,
    type: "lost",
    title: "Blue Sony Headphones",
    category: "Electronics",
    suburb: "Melbourne CBD, VIC",
    date: "14 Jul 2026",
    description:
      "Lost between Flinders Street and QV.",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80",
    verified: false
  },
  {
    id: 3,
    type: "found",
    title: "House Keys",
    category: "Keys",
    suburb: "Brisbane, QLD",
    date: "13 Jul 2026",
    description:
      "Three keys on a green tag.",
    image:
      "https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=1000&q=80",
    verified: true
  }
];

const categories = [
  "All categories",
  "Wallets",
  "Electronics",
  "Keys",
  "Pets",
  "Bags",
  "Jewellery",
  "Documents",
  "Other"
];

function App() {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("returnaroo-items");
    return saved ? JSON.parse(saved) : seedItems;
  });

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All categories");
  const [type, setType] = useState("all");
  const [modal, setModal] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const q = query.toLowerCase();

      const text = (
        item.title +
        item.description +
        item.suburb +
        item.category
      ).toLowerCase();

      return (
        (type === "all" || item.type === type) &&
        (category === "All categories" ||
          item.category === category) &&
        text.includes(q)
      );
    });
  }, [items, query, category, type]);

  function addItem(item) {
    const next = [
      {
        ...item,
        id: Date.now(),
        verified: false
      },
      ...items
    ];

    setItems(next);
    localStorage.setItem(
      "returnaroo-items",
      JSON.stringify(next)
    );
    setModal(null);
  }

  return (
    <div className="app-shell">

      <header className="topbar">

        <a href="#" className="brand">
          <span className="brand-mark">R</span>
          <span>Returnaroo</span>
        </a>

        <nav className={menuOpen ? "nav open" : "nav"}>
          <a href="#browse">Browse</a>
          <a href="#how">How it works</a>
          <a href="#safety">Safety</a>
        </nav>

        <div className="header-actions">

          <button
            className="ghost desktop-only"
            onClick={() => setModal("lost")}
          >
            I lost something
          </button>

          <button
            className="primary desktop-only"
            onClick={() => setModal("found")}
          >
            <Plus size={18}/>
            I found something
          </button>

          <button
            className="menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X/> : <Menu/>}
          </button>

        </div>

      </header>

      <main>

        <section className="hero">

          <div className="hero-copy">

            <span className="eyebrow">
              <Sparkles size={16}/>
              Community powered across Australia
            </span>

            <h1>
              Lost it?
              <br/>
              <em>Let Australia help.</em>
            </h1>

            <p>
              Australia's community-powered lost and found.
              Report lost items, post found items and help
              reunite people with their belongings.
            </p>

            <div className="hero-cta">

              <button
                className="primary large"
                onClick={() => setModal("lost")}
              >
                Report lost item
                <ChevronRight size={18}/>
              </button>

              <button
                className="secondary large"
                onClick={() => setModal("found")}
              >
                Post found item
              </button>

            </div>

            <div className="trust-row">

              <span>
                <ShieldCheck/>
                Safe handovers
              </span>

              <span>
                <MapPinned/>
                Australia-wide
              </span>

              <span>
                <Heart/>
                Free forever
              </span>

            </div>

          </div>

          <div className="hero-visual">

            <div className="map-card">

              <div className="map-shape">
                AU
              </div>

              <span className="pin p1"><MapPin/></span>
              <span className="pin p2"><MapPin/></span>
              <span className="pin p3"><MapPin/></span>

            </div>

          </div>

        </section>
                <section className="search-wrap" id="browse">

          <div className="search-panel">

            <div className="search-input">
              <Search size={20}/>
              <input
                value={query}
                onChange={(e)=>setQuery(e.target.value)}
                placeholder="Search item, suburb or description..."
              />
            </div>

            <select
              value={category}
              onChange={(e)=>setCategory(e.target.value)}
            >
              {categories.map(c=>(
                <option key={c}>{c}</option>
              ))}
            </select>

            <button className="primary">
              Search
            </button>

          </div>

        </section>

        <section
          className="listings section-pad"
          id="browse"
        >

          <div className="section-heading">

            <div>

              <span className="kicker">
                Latest community posts
              </span>

              <h2>
                Recently Lost & Found
              </h2>

            </div>

            <div className="filter-tabs">

              <SlidersHorizontal size={18}/>

              {["all","lost","found"].map(t=>(
                <button
                  key={t}
                  className={
                    type===t ? "active" : ""
                  }
                  onClick={()=>setType(t)}
                >
                  {t}
                </button>
              ))}

            </div>

          </div>

          <div className="cards-grid">

            {filtered.map(item=>(

              <article
                className="item-card"
                key={item.id}
              >

                <div className="card-image">

                  <img
                    src={item.image}
                    alt={item.title}
                  />

                  <span
                    className={`status ${item.type}`}
                  >
                    {item.type}
                  </span>

                  {item.verified &&

                    <span className="verified">
                      <CheckCircle2 size={14}/>
                      Verified
                    </span>

                  }

                </div>

                <div className="card-body">

                  <div className="meta">

                    <span>
                      {item.category}
                    </span>

                    <span>
                      <Clock3 size={14}/>
                      {item.date}
                    </span>

                  </div>

                  <h3>
                    {item.title}
                  </h3>

                  <p>
                    {item.description}
                  </p>

                  <div className="location">
                    <MapPin size={15}/>
                    {item.suburb}
                  </div>

                  <button
                    className="contact-btn"
                  >
                    View details
                    <ChevronRight size={16}/>
                  </button>

                </div>

              </article>

            ))}

          </div>

        </section>

        <section
          className="how section-pad"
          id="how"
        >

          <div className="center-heading">

            <span className="kicker">
              How it works
            </span>

            <h2>
              Three simple steps
            </h2>

          </div>

          <div className="steps">

            <div>

              <span>01</span>

              <Camera/>

              <h3>
                Create a post
              </h3>

              <p>
                Upload photos and describe
                what you lost or found.
              </p>

            </div>

            <div>

              <span>02</span>

              <Search/>

              <h3>
                Search listings
              </h3>

              <p>
                Browse thousands of
                community posts.
              </p>

            </div>

            <div>

              <span>03</span>

              <PackageCheck/>

              <h3>
                Return safely
              </h3>

              <p>
                Meet publicly and verify
                ownership before handing
                over items.
              </p>

            </div>

          </div>

        </section>

        <section
          className="safety section-pad"
          id="safety"
        >

          <div className="safety-card">

            <ShieldCheck/>

            <div>

              <span className="kicker">
                Stay safe
              </span>

              <h2>
                Verify ownership first.
              </h2>

              <p>
                Never publish serial numbers,
                passport details or exact
                addresses. Ask claimants to
                identify something only the
                real owner would know.
              </p>

            </div>

          </div>

        </section>

      </main>

      <footer>

        <div className="brand">

          <span className="brand-mark">
            R
          </span>

          <span>
            Returnaroo
          </span>

        </div>

        <p>
          Australia's community-powered
          lost &amp; found.
        </p>

        <div className="socials">

          <a
            href="https://github.com/g-htz"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>

          <a
            href="https://linkedin.com/in/g-htz"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>

        </div>

      </footer>

      <div className="mobile-post">

        <button
          onClick={()=>setModal("lost")}
        >
          Lost
        </button>

        <button
          onClick={()=>setModal("found")}
        >
          <Plus/>
          Found
        </button>

      </div>

      {modal &&

        <PostModal
          type={modal}
          onClose={()=>setModal(null)}
          onSubmit={addItem}
        />

      }

    </div>
  );
}
function PostModal({ type, onClose, onSubmit }) {
  const [form, setForm] = useState({
    title: "",
    category: "Other",
    suburb: "",
    description: "",
    date: new Date().toLocaleDateString("en-AU", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    }),
    image:
      "https://images.unsplash.com/photo-1586769852836-bc069f19e1b6?auto=format&fit=crop&w=1000&q=80",
    type
  });

  function update(e) {
    setForm((current) => ({
      ...current,
      [e.target.name]: e.target.value
    }));
  }

  function submit(e) {
    e.preventDefault();

    if (
      !form.title ||
      !form.suburb ||
      !form.description
    ) {
      return;
    }

    onSubmit(form);
  }

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <form
        className="modal"
        onSubmit={submit}
      >

        <button
          type="button"
          className="close"
          onClick={onClose}
        >
          <X/>
        </button>

        <span className="kicker">
          Community post
        </span>

        <h2>
          {type === "lost"
            ? "Report a lost item"
            : "Post a found item"}
        </h2>

        <p className="modal-intro">
          Share enough information to
          identify the item without giving
          away everything publicly.
        </p>

        <label>

          Item title

          <input
            name="title"
            value={form.title}
            onChange={update}
            required
          />

        </label>

        <div className="form-row">

          <label>

            Category

            <select
              name="category"
              value={form.category}
              onChange={update}
            >

              {categories
                .slice(1)
                .map((c)=>(
                  <option key={c}>
                    {c}
                  </option>
              ))}

            </select>

          </label>

          <label>

            Suburb

            <input
              name="suburb"
              value={form.suburb}
              onChange={update}
              required
            />

          </label>

        </div>

        <label>

          Description

          <textarea
            name="description"
            value={form.description}
            onChange={update}
            required
          />

        </label>

        <label>

          Image URL

          <input
            name="image"
            value={form.image}
            onChange={update}
          />

        </label>

        <button
          className="primary large full"
          type="submit"
        >
          Publish post
        </button>

      </form>
    </div>
  );
}

createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);
