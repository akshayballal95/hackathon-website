<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { SearchResult } from '../lib/search';
  import { searchContent } from '../lib/search';
  
  const dispatch = createEventDispatcher<{
    search: { results: SearchResult[] }
  }>();
  
  let searchQuery = '';
  let results: SearchResult[] = [];
  let isSearching = false;

  function handleSearch() {
    isSearching = true;
    results = searchContent(searchQuery);
    dispatch('search', { results });
  }

  function handleInput() {
    if (searchQuery.length >= 2) {
      handleSearch();
    } else {
      results = [];
      dispatch('search', { results });
    }
  }
</script>

<div class="search-container">
  <div class="search-box">
    <span class="search-icon">🔍</span>
    <input
      type="text"
      bind:value={searchQuery}
      on:input={handleInput}
      placeholder="What do you need help with?"
      aria-label="Search"
    />
    {#if searchQuery}
      <button 
        class="clear-button" 
        on:click={() => {
          searchQuery = '';
          results = [];
          dispatch('search', { results });
        }}
        aria-label="Clear search"
      >
        ✕
      </button>
    {/if}
  </div>
</div>

<style>
  .search-container {
    width: 100%;
    max-width: 800px;
    margin: 0 auto 2rem;
  }

  .search-box {
    position: relative;
    width: 100%;
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    border: 2px solid transparent;
    transition: all 0.2s;
  }

  .search-box:focus-within {
    border-color: #e31837;
    box-shadow: 0 4px 12px rgba(227, 24, 55, 0.1);
  }

  .search-icon {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.2rem;
    color: #666;
  }

  input {
    width: 100%;
    padding: 1rem 3rem;
    font-size: 1.2rem;
    border: none;
    border-radius: 12px;
    background: transparent;
    color: #333;
  }

  input::placeholder {
    color: #999;
  }

  input:focus {
    outline: none;
  }

  .clear-button {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    background: #eee;
    border: none;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    font-size: 0.9rem;
    line-height: 1;
    padding: 0;
    color: #666;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .clear-button:hover {
    background: #ddd;
    color: #333;
  }

  @media (max-width: 768px) {
    input {
      font-size: 1.1rem;
      padding: 0.8rem 3rem;
    }
  }
</style>