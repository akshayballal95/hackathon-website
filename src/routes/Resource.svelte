<script lang="ts">
  import { resources } from '../lib/data';
  import { Link } from "svelte-routing";
  import { writable } from 'svelte/store';

  export let id: string;
  
  // Fetch the resource based on the id
  $: categoryResources = Object.values(resources).filter(resource => resource.id === id || resource.id === 'shelter');

  const openSections = writable<Record<string, boolean>>({});

  function toggleSection(resourceId: string, section: string) {
    openSections.update(sections => ({
      ...sections,
      [`${resourceId}-${section}`]: !sections[`${resourceId}-${section}`]
    }));
  }

  function isOpen(resourceId: string, section: string): boolean {
    let isOpenValue = false;
    openSections.subscribe(sections => {
      isOpenValue = !!sections[`${resourceId}-${section}`];
    })();
    return isOpenValue;
  }
</script>

<div class="container">
  <Link to="/" class="back-button">
    <span class="back-icon">←</span>
    Back to all services
  </Link>
  
  {#each categoryResources as resource}
    <div class="resource-card">
      <div class="title-section">
        <span class="icon">{resource.icon}</span>
        <h2>{resource.title}</h2>
      </div>

      <p class="description">{resource.description}</p>

      <!-- Dropdown for Shelter Subcategories -->
      {#if resource.id === 'shelter'}
        <div class="dropdown">
          <button class="dropdown-button" on:click={() => toggleSection(resource.id, 'subcategories')}>
            Subcategories
            <span class="toggle-icon">{$openSections[`${resource.id}-subcategories`] ? '−' : '+'}</span>
          </button>
          {#if $openSections[`${resource.id}-subcategories`]}
            <div class="dropdown-content">
              <Link to="/day-shelter" class="dropdown-link">Day Shelter</Link>
              <Link to="/night-shelter" class="dropdown-link">Night Shelter</Link>
            </div>
          {/if}
        </div>
      {/if}

      {#if resource.details?.openingHours}
        <div class="accordion-section">
          <button 
            class="accordion-header" 
            on:click={() => toggleSection(resource.id, 'hours')}
            aria-expanded={$openSections[`${resource.id}-hours`]}>
            <span class="section-title">Opening Hours:</span>
            <span class="toggle-icon">{$openSections[`${resource.id}-hours`] ? '−' : '+'}</span>
          </button>
          {#if $openSections[`${resource.id}-hours`]}
            <div class="accordion-content">
              <div class="detail-item">
                <strong>Weekdays:</strong> {resource.details.openingHours.weekdays}
              </div>
              <div class="detail-item">
                <strong>Weekends:</strong> {resource.details.openingHours.weekends}
              </div>
            </div>
          {/if}
        </div>
      {/if}

      {#if resource.details?.contact}
        <div class="accordion-section">
          <button 
            class="accordion-header" 
            on:click={() => toggleSection(resource.id, 'contact')}
            aria-expanded={$openSections[`${resource.id}-contact`]}>
            <span class="section-title">Contact:</span>
            <span class="toggle-icon">{$openSections[`${resource.id}-contact`] ? '−' : '+'}</span>
          </button>
          {#if $openSections[`${resource.id}-contact`]}
            <div class="accordion-content">
              {#if resource.details.contact.phone}
                <div class="detail-item">
                  <strong>Phone:</strong> {resource.details.contact.phone}
                </div>
              {/if}
              {#if resource.details.contact.whatsapp}
                <div class="detail-item">
                  <strong>WhatsApp:</strong> {resource.details.contact.whatsapp}
                </div>
              {/if}
              {#if resource.details.contact.email}
                <div class="detail-item">
                  <strong>Email:</strong> {resource.details.contact.email}
                </div>
              {/if}
              {#if resource.details.contact.website}
                <div class="detail-item">
                  <strong>Website:</strong> 
                  <a href={resource.details.contact.website} target="_blank" rel="noopener noreferrer">
                    {resource.details.contact.website}
                  </a>
                </div>
              {/if}
            </div>
          {/if}
        </div>
      {/if}

      {#if resource.details?.notes}
        <div class="accordion-section">
          <button 
            class="accordion-header" 
            on:click={() => toggleSection(resource.id, 'notes')}
            aria-expanded={$openSections[`${resource.id}-notes`]}>
            <span class="section-title">What you need to know:</span>
            <span class="toggle-icon">{$openSections[`${resource.id}-notes`] ? '−' : '+'}</span>
          </button>
          {#if $openSections[`${resource.id}-notes`]}
            <div class="accordion-content">
              <p>{resource.details.notes}</p>
            </div>
          {/if}
        </div>
      {/if}

      <div class="meta">
        <span>Source: {resource.source}</span>
        <span class="date">Last updated: {resource.lastUpdated}</span>
      </div>
    </div>
      
    {#if resource.details?.formEmbedUrl}
      <div class="form-container">
        <iframe
          src={resource.details.formEmbedUrl}
          width="100%"
          height="800px"
          frameborder="0"
          marginheight="0"
          marginwidth="0"
          title="Feedback Form"
        >
          Loading...
        </iframe>
      </div>
    {/if}
{/each}
</div>
