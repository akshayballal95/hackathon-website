<script lang="ts">
  import { categories, emergencyContacts, resources, fetchResources } from "../lib/data";
  import { Link } from "svelte-routing";
  import SearchBar from "../components/SearchBar.svelte";
  import SearchResults from "../components/SearchResults.svelte";
  import type { SearchResult } from "../lib/search";
  import { onMount } from "svelte";
  import { sanityClient } from "../sanityClient";
  import type { Resource } from "../lib/types";
  let searchResults: SearchResult[] = [];
  let loadedResources: Resource[] = [];

  function handleSearch(event: CustomEvent<{ results: SearchResult[] }>) {
    searchResults = event.detail.results;
  }

  function callNumber(number: string) {
    window.location.href = `tel:${number}`;
  }

  function openWhatsApp(number: string) {
    window.location.href = `https://wa.me/${number.replace(/[^0-9]/g, "")}`;
  }

  onMount(async () => {
    await fetchResources();
    loadedResources = resources;
  });
</script>

<div class="container">
  <header class="header">
    <h1>Support in The Hague</h1>

    <!-- Emergency Contact Bar -->
    <div class="emergency-bar">
      {#each emergencyContacts as contact}
        <div class="emergency-item">
          <strong>{contact.name}:</strong>
          <button
            class="call-button"
            on:click={() => callNumber(contact.number)}
          >
            📞 {contact.number}
          </button>
          {#if contact.whatsapp}
            <button
              class="whatsapp-button"
              on:click={() => openWhatsApp(contact.number)}
            >
              💬 WhatsApp
            </button>
          {/if}
        </div>
      {/each}
    </div>

    <div class="intro">
      <p class="large-text">
        This site is by the Netherlands Red Cross for people who are
        undocumented: without legal status or BSN. We do not share your personal
        details.
      </p>
      <p class="large-text">
        Find information for local services like legal support, health, and
        shelter.
      </p>
    </div>

    <SearchBar on:search={handleSearch} />
    <SearchResults results={searchResults} />
  </header>

  {#if searchResults.length === 0}
    <section class="regular-section">
      <h2>All Support Services:</h2>
      <div class="categories">
        {#each categories as category}
          <Link to={`/category/${category.id}`} class="category-link">
            <div class="category-card">
              <div class="card-header">
                <span class="icon">{category.icon}</span>
                <h3>{category.title}</h3>
              </div>
              <p>{category.description}</p>
              <span class="click-hint">Click for more information →</span>
            </div>
          </Link>
        {/each}
      </div>
    </section>
  {/if}
</div>

<style>
  .container {
    max-width: 1500px;
    margin: 0 auto;
    padding: 0.5rem;
  }

  .header {
    text-align: center;
    max-width: 1000px;
    margin: 0 auto 0.6rem;
  }

  h1 {
    color: #333;
    font-size: 1.8rem;
    margin-bottom: 0.5rem;
  }

  /* Emergency Bar at the Top */
  .emergency-bar {
    position: sticky;
    top: 0;
    background: white; /* Red Cross color */
    color: black;
    padding: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    font-size: 0.85rem;
    z-index: 1000;
    width: 100%;
  }

  /* Emergency Item Layout */
  .emergency-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  /* Emergency Buttons */
  .call-button,
  .whatsapp-button {
    background: white;
    color: #e31837;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    cursor: pointer;
    font-size: 0.8rem;
    display: flex;
    align-items: center;
    gap: 0.3rem;
    min-width: 150px;
  }

  .call-button:hover {
    background: #fff3f4;
  }

  .whatsapp-button {
    color: #25d366;
  }

  .whatsapp-button:hover {
    background: #e9ffee;
  }

  /* Responsive for Smaller Screens */
  @media (max-width: 768px) {
    .emergency-bar {
      flex-direction: column;
      align-items: flex-start;
      padding: 0.8rem;
    }

    .emergency-item {
      flex-direction: column;
      align-items: flex-start;
    }

    .call-button,
    .whatsapp-button {
      width: 100%;
    }
  }

  /* Introductory Text */
  .intro {
    margin: 1rem 0; /* Add space above and below the intro text */
  }

  /* Search Bar Component */
  .search-bar {
    margin: 1rem 0; /* Add space above and below the search bar */
  }

  /* Emergency Navigator */
  .emergency-banner {
    background: white;
    padding: 0.5rem;
    border-radius: 6px;
    margin: 0.5rem 0;
    border: 2px solid #e31837;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .emergency-banner h2 {
    font-size: 1rem;
    color: #e31837;
    margin-right: 1rem;
    white-space: nowrap;
  }

  .emergency-contacts {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .emergency-contact {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .emergency-contact strong {
    font-size: 0.85rem;
    color: #333;
  }

  .contact-buttons {
    display: flex;
    gap: 0.3rem;
  }

  .call-button,
  .whatsapp-button {
    font-size: 0.75rem;
    padding: 0.2rem 0.4rem;
    border: 2px solid transparent;
    border-radius: 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.2rem;
    white-space: nowrap;
    min-width: 90px;
  }

  .call-button {
    color: black;
    border-color: #e31837;
    background: transparent;
  }

  .whatsapp-button {
    color: black;
    border-color: #25d366;
    background: transparent;
  }

  .call-button:hover {
    background: rgba(227, 24, 55, 0.1);
  }

  .whatsapp-button:hover {
    background: rgba(37, 211, 102, 0.1);
  }

  /* Categories & Cards */
  .categories {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
    padding: 0.5rem;
  }

  .category-link {
    text-decoration: none;
    color: inherit;
  }

  .category-card {
    background: white;
    padding: 1rem;
    border-radius: 10px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    border: 2px solid transparent;
    transition: all 0.2s;
    height: 150px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .card-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .category-card:hover {
    border-color: #e31837;
    transform: translateY(-3px);
  }

  h3 {
    color: #333;
    font-size: 1rem;
    margin: 0;
  }

  p {
    color: #555;
    margin: 0;
    font-size: 0.9rem;
    line-height: 1.4;
  }

  .click-hint {
    display: block;
    margin-top: 0.6rem;
    color: #e31837;
    font-size: 0.8rem;
    text-align: right;
  }

  @media (max-width: 768px) {
    .categories {
      grid-template-columns: 1fr;
    }

    .category-card {
      padding: 0.8rem;
    }

    h1 {
      font-size: 1.6rem;
    }

    .emergency-banner {
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    .emergency-contacts {
      justify-content: center;
    }

    .contact-buttons {
      flex-direction: row;
    }

    .call-button,
    .whatsapp-button {
      min-width: 80px;
      font-size: 0.7rem;
      padding: 0.2rem;
    }
  }
</style>
