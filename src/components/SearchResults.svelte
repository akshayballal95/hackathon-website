<script lang="ts">
  import type { SearchResult } from '../lib/search';
  import { Link } from "svelte-routing";

  export let results: SearchResult[] = [];
</script>

{#if results.length > 0}
  <div class="results-container">
    <h3>We found these matches:</h3>
    <div class="results-list">
      {#each results as result}
        {#if result.type === 'category'}
          <Link to={`/category/${result.category.id}`} class="result-link">
            <div class="result-card">
              <span class="icon">{result.category.icon}</span>
              <div class="content">
                <h4>{result.category.title}</h4>
                <p>{result.category.description}</p>
              </div>
              <span class="arrow">→</span>
            </div>
          </Link>
        {:else}
          <Link to={`/resource/${result.category.id}/${result.resource?.id}`} class="result-link">
            <div class="result-card">
              <span class="icon">{result.resource?.icon || result.category.icon}</span>
              <div class="content">
                <h4>{result.resource?.title}</h4>
                <p>{result.resource?.description}</p>
                {#if result.resource?.details?.openingHours}
                  <p class="details">Open: {result.resource.details.openingHours}</p>
                {/if}
              </div>
              <span class="arrow">→</span>
            </div>
          </Link>
        {/if}
      {/each}
    </div>
  </div>
{/if}

<style>
  .results-container {
    max-width: 800px;
    margin: 0 auto 2rem;
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }

  h3 {
    color: #333;
    margin: 0 0 1rem;
    font-size: 1.3rem;
  }

  .results-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .result-link {
    text-decoration: none;
    color: inherit;
  }

  .result-card {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    border-radius: 8px;
    background: #f9f9f9;
    transition: all 0.2s;
  }

  .result-card:hover {
    background: #fff3f5;
    transform: translateX(4px);
  }

  .icon {
    font-size: 1.5rem;
    flex-shrink: 0;
  }

  .content {
    flex-grow: 1;
  }

  h4 {
    color: #333;
    margin: 0 0 0.3rem;
    font-size: 1.1rem;
  }

  p {
    color: #666;
    margin: 0;
    font-size: 1rem;
    line-height: 1.4;
  }

  .details {
    font-size: 0.9rem;
    color: #e31837;
    margin-top: 0.5rem;
  }

  .arrow {
    color: #e31837;
    font-size: 1.2rem;
    flex-shrink: 0;
  }

  @media (max-width: 768px) {
    .results-container {
      margin: 0 1rem 2rem;
    }
  }
</style>