<script lang="ts">
  import { Router, Link, Route } from "svelte-routing";
  import Home from "./routes/Home.svelte";
  import Category from "./routes/Category.svelte";
  import Resource from "./routes/Resource.svelte";
  import ChatBot from "./components/ChatBot.svelte";
  import SearchBar from "./components/SearchBar.svelte";
  import SearchResults from "./components/SearchResults.svelte";
  import type { SearchResult } from "./lib/search";

  export let url = "";
  let searchResults: SearchResult[] = [];
  function handleSearch(event: CustomEvent<{ results: SearchResult[] }>) {
    searchResults = event.detail.results;
  }
</script>

<Router {url}>
  <nav class="header">
    <div class="header-content">
    <Link to="/">
      <div class="logo">
        <span>Support in The Hague</span>
      </div>
    </Link>
    <div class="search-container">
      <SearchBar on:search={handleSearch} />
    </div>
    {#if searchResults.length > 0}
      <div class="results-wrapper">
        <SearchResults results={searchResults} />
      </div>
    {/if}
    </div>
  </nav>

  <main>
    <Route path="/" component={Home} />
    <Route path="/category/:id" component={Category} />
    <Route path="/category/:id/:subId" component={Category} />
    <Route path="/resource/:categoryId/:id" component={Resource} />
  </main>

  <!-- Footer -->
  <footer class="footer">
    <div class="footer-content">
      <ul class="footer-links">
        <li>
          <a href="https://helpfulinformation.redcross.nl/" target="_blank"
            >Visit the main website</a
          >
        </li>
        <li><Link to="/privacy">Privacy Statement</Link></li>
      </ul>
    </div>
  </footer>

  <ChatBot />
</Router>

<style>
  :global(body) {
    margin: 0;
    font-family:
      Inter,
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      sans-serif;
    background-color: #f9f7f4;
  }

  .header {
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    position: sticky;
    top: 0;
    z-index: 1000;
  }

  .header-content {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    position: relative;
  }

  .logo {
    font-size: 1.5rem;
    font-weight: bold;
    color: #e31837;
  }

  main {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }

  :global(a) {
    text-decoration: none;
    color: inherit;
  }

  /* Footer Styles */
  .footer {
    background-color: #fff;
    padding: 2rem;
    text-align: center;
    border-top: 1px solid #ddd;
  }

  .footer-content {
    max-width: 1200px;
    margin: 0 auto;
  }

  .footer-links {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  .footer-links li {
    margin-bottom: 1rem;
  }

  .footer-links a {
    text-decoration: none;
    color: #e31837;
    font-weight: 600;
  }

  .footer-links a:hover {
    text-decoration: underline;
  }

  .results-wrapper {
    margin-top: 1rem;
  } 

  .search-container {
    margin-left:auto;
    max-width: 400px;
    width: 100%;
    margin-top: 25px;
  }
  .results-wrapper {
    position: absolute;
    top: 100%;
    left: 0;
    right:0;
    background: white;
    box-shadow: 0 4px 6px rgba(0, 0,0,0.1);
  }

</style>
