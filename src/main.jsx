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
  Menu,
  Github,
  Linkedin
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
      "Found near the light rail stop. Contains cards but no cash. Tell me the initials on the licence.",
    image:
      "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=1000&q=80",
    verified: true
  },
  {
    id: 2,
    type: "lost",
    title: "Blue Sony headphones",
    category: "Electronics",
    suburb: "Melbourne CBD, VIC",
    date: "14 Jul 2026",
    description:
      "Lost between Flinders Street and QV. Small scratch on the left earcup.",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80",
    verified: false
  },
  {
    id: 3,
    type: "found",
    title: "Set of house keys",
    category: "Keys",
    suburb: "New Farm, QLD",
    date: "14 Jul 2026",
    description:
      "Three keys and a small green tag. Found near the riverwalk.",
    image:
      "https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=1000&q=80",
    verified: true
  },
  {
    id: 4,
    type: "lost",
    title: "Brown cavoodle, Milo",
    category: "Pets",
    suburb: "Fremantle, WA",
    date: "13 Jul 2026",
    description:
      "Friendly, microchipped, wearing a red collar. Last seen near South Beach.",
    image:
      "https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=1000&q=80",
    verified: true
  },
  {
    id: 5,
    type: "found",
    title: "Grey backpack",
    category: "Bags",
    suburb: "Adelaide, SA",
    date: "12 Jul 2026",
    description:
      "Found on a bench outside Adelaide Station. Describe the contents to claim.",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80",
    verified: false
  },
  {
    id: 6,
    type: "lost",
    title: "Gold bracelet",
    category: "Jewellery",
    suburb: "Hobart, TAS",
    date: "11 Jul 2026",
    description:
      "Fine gold chain with a tiny star charm. Sentimental value.",
    image:
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1000&q=80",
    verified: false
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
    try {
      const savedItems = localStorage.getItem("returnaroo-items");
      return savedItems ? JSON.parse(savedItems) : seedItems;
    } catch {
      return seedItems;
    }
  });

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All categories");
  const [type, setType] = useState("all");
  const [modal, setModal] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const searchText = query.trim().toLowerCase();

      const itemText = [
        item.title,
        item.category,
        item.suburb,
        item.description
      ]
        .join(" ")
        .toLowerCase();

      const matchesQuery =
        searchText.length === 0 || itemText.includes(searchText);

      const matchesCategory =
        category === "All categories" || item.category === category;

      const matchesType = type === "all" || item.type === type;

      return matchesQuery && matchesCategory && matchesType;
    });
  }, [items, query, category, type]);

  function addItem(payload) {
    const newItems = [
      {
        id: Date.now(),
        ...payload,
        verified: false
      },
      ...items
    ];

    setItems(newItems);
    localStorage.setItem("returnaroo-items", JSON.stringify(newItems));
    setModal(null);
  }

  function closeMobileMenu() {
    setMenuOpen(false);
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <a
          className="brand"
          href="#top"
          aria-label="Returnaroo home"
          onClick={closeMobileMenu}
        >
          <span className="brand-mark">R</span>
          <span>Returnaroo</span>
        </a>

        <nav className={menuOpen ? "nav open" : "nav"}>
          <a href="#browse" onClick={closeMobileMenu}>
            Browse
          </a>

          <a href="#how" onClick={closeMobileMenu}>
            How it works
          </a>

          <a href="#safety" onClick={closeMobileMenu}>
            Safety
          </a>
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
            <Plus size={17} />
            I found something
          </button>

          <button
            className="menu-btn"
            onClick={() => setMenuOpen((current) => !current)}
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <span className="eyebrow">
              <Sparkles size={16} />
              Community-powered across Australia
            </span>

            <h1>
              Lost it?
              <br />
              <em>Let Australia help.</em>
            </h1>

            <p>
              Returnaroo connects people who have lost something with the
              locals who found it — quickly, safely and without the red tape.
            </p>

            <div className="hero-cta">
              <button
                className="primary large"
                onClick={() => setModal("lost")}
              >
                Report a lost item
                <ChevronRight size={18} />
              </button>

              <button
                className="secondary large"
                onClick={() => setModal("found")}
              >
                Post a found item
              </button>
            </div>

            <div className="trust-row">
              <span>
                <ShieldCheck />
                Safer handovers
              </span>

              <span>
                <MapPinned />
                Australia-wide
              </span>

              <span>
                <Heart />
                Free for everyone
              </span>
            </div>
          </div>

          <div className="hero-visual" aria-hidden="true">
            <div className="map-card">
              <div className="map-shape">AU</div>

              <span className="pin p1">
                <MapPin />
              </span>

              <span className="pin p2">
                <MapPin />
              </span>

              <span className="pin p3">
                <MapPin />
              </span>

              <span className="pin p4">
                <MapPin />
              </span>

              <div className="floating-card fc1">
                <PackageCheck />

                <div>
                  <strong>Wallet found</strong>
                  <small>Surry Hills, NSW</small>
                </div>
              </div>

              <div className="floating-card fc2">
                <MessageCircle />

                <div>
                  <strong>Possible match</strong>
                  <small>Contact the finder</small>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="search-wrap" id="browse">
          <div className="search-panel">
            <div className="search-input">
              <Search size={21} />

              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search item, suburb or description"
                aria-label="Search listings"
              />
            </div>

            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              aria-label="Filter by category"
            >
              {categories.map((categoryName) => (
                <option key={categoryName}>{categoryName}</option>
              ))}
            </select>

            <button className="primary search-button">Search</button>
          </div>
        </section>

        <section className="listings section-pad">
          <div className="section-heading">
            <div>
              <span className="kicker">Latest community posts</span>
              <h2>Recently lost &amp; found</h2>
            </div>

            <div className="filter-tabs">
              <SlidersHorizontal size={17} />

              {["all", "lost", "found"].map((filterType) => (
                <button
                  key={filterType}
                  className={type === filterType ? "active" : ""}
                  onClick={() => setType(filterType)}
                >
                  {filterType[0].toUpperCase() + filterType.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="cards-grid">
            {filteredItems.map((item) => (
              <article className="item-card" key={item.id}>
                <div className="card-image">
                  <img src={item.image} alt={item.title} />

                  <span className={`status ${item.type}`}>{item.type}</span>

                  {item.verified && (
                    <span className="verified">
                      <CheckCircle2 size={14} />
                      Verified user
                    </span>
                  )}
                </div>

                <div className="card-body">
                  <div className="meta">
                    <span>{item.category}</span>

                    <span>
                      <Clock3 size={14} />
                      {item.date}
                    </span>
                  </div>

                  <h3>{item.title}</h3>

                  <p>{item.description}</p>

                  <div className="location">
                    <MapPin size={16} />
                    {item.suburb}
                  </div>

                  <button className="contact-btn">
                    View details
                    <ChevronRight size={17} />
                  </button>
                </div>
              </article>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="empty">
              <Search />
              <h3>No matches yet</h3>
              <p>Try another suburb, category or keyword.</p>
            </div>
          )}
        </section>

        <section className="how section-pad" id="how">
          <div className="center-heading">
            <span className="kicker">Simple by design</span>
            <h2>How Returnaroo works</h2>
            <p>Three steps from “oh no” to “got it back”.</p>
          </div>

          <div className="steps">
            <div>
              <span>01</span>
              <Camera />

              <h3>Post the item</h3>

              <p>
                Add a photo, location and a few identifying details.
              </p>
            </div>

            <div>
              <span>02</span>
              <Search />

              <h3>Find a match</h3>

              <p>
                Search nearby posts or let the community spot the connection.
              </p>
            </div>

            <div>
              <span>03</span>
              <PackageCheck />

              <h3>Return it safely</h3>

              <p>
                Verify ownership and arrange a secure public handover.
              </p>
            </div>
          </div>
        </section>

        <section className="safety section-pad" id="safety">
          <div className="safety-card">
            <ShieldCheck />

            <div>
              <span className="kicker">Safety first</span>

              <h2>
                Keep exact details private until ownership is verified.
              </h2>

              <p>
                Returnaroo encourages users to omit serial numbers, full ID
                details and exact addresses from public posts. Meet in a public
                place and ask the claimant to identify something only the real
                owner would know.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="brand">
          <span className="brand-mark">R</span>
          <span>Returnaroo</span>
        </div>

        <p>Australia’s community-powered lost &amp; found.</p>

        <div className="socials">
          <a
            href="https://github.com/g-htz"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <Github />
          </a>

          <a
            href="https://linkedin.com/in/g-htz"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <Linkedin />
          </a>
        </div>
      </footer>

      <div className="mobile-post">
        <button onClick={() => setModal("lost")}>Lost</button>

        <button onClick={() => setModal("found")}>
          <Plus />
          Found
        </button>
      </div>

      {modal && (
        <PostModal
          type={modal}
          onClose={() => setModal(null)}
          onSubmit={addItem}
        />
      )}
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

  function updateForm(event) {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value
    }));
  }

  function submitForm(event) {
    event.preventDefault();

    if (!form.title || !form.suburb || !form.description) {
      return;
    }

    onSubmit(form);
  }

  return (
    <div
      className="modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <form className="modal" onSubmit={submitForm}>
        <button
          type="button"
          className="close"
          onClick={onClose}
          aria-label="Close form"
        >
          <X />
        </button>

        <span className="kicker">Community post</span>

        <h2>
          {type === "lost"
            ? "Report a lost item"
            : "Post a found item"}
        </h2>

        <p className="modal-intro">
          Share enough to help, but keep one identifying detail private so
          ownership can be verified.
        </p>

        <label>
          Item title

          <input
            name="title"
            value={form.title}
            onChange={updateForm}
            placeholder="e.g. Black leather wallet"
            required
          />
        </label>

        <div className="form-row">
          <label>
            Category

            <select
              name="category"
              value={form.category}
              onChange={updateForm}
            >
              {categories.slice(1).map((categoryName) => (
                <option key={categoryName}>{categoryName}</option>
              ))}
            </select>
          </label>

          <label>
            Suburb &amp; state

            <input
              name="suburb"
              value={form.suburb}
              onChange={updateForm}
              placeholder="e.g. Bondi, NSW"
              required
            />
          </label>
        </div>

        <label>
          Description

          <textarea
            name="description"
            value={form.description}
            onChange={updateForm}
            placeholder="Where was it lost or found? What should people know?"
            required
          />
        </label>

        <label>
          Image URL <small>(demo app)</small>

          <input
            name="image"
            value={form.image}
            onChange={updateForm}
          />
        </label>

        <button className="primary large full" type="submit">
          Publish post
        </button>
      </form>
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
