<template>
  <div class="WhatsNew">
    <h3 class="WhatsNew-heading">
      <v-icon size="24" class="WhatsNew-heading-icon">
        mdi-information
      </v-icon>
      {{ '最新のお知らせ' }}
    </h3>
    <ul class="WhatsNew-list">
      <li v-for="(item, i) in items" :key="i" class="WhatsNew-list-item">
        <a
          class="WhatsNew-list-item-anchor"
          :href="item.url"
          target="_blank"
          rel="noopener"
        >
          <time
            class="WhatsNew-list-item-anchor-time px-2"
            :datetime="formattedDate(item.date)"
          >
            {{ item.date }}
          </time>
          <span class="WhatsNew-list-item-anchor-link">
            {{ item.text }}
            <v-icon
              v-if="!isInternalLink(item.url)"
              class="WhatsNew-item-ExternalLinkIcon"
              size="12"
            >
              mdi-open-in-new
            </v-icon>
          </span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { convertDateToISO8601Format } from '../utils/formatDate';

export default Vue.extend({
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  methods: {
    isInternalLink(path: string): boolean {
      return !/^https?:\/\//.test(path);
    },
    formattedDate(dateString: string) {
      return convertDateToISO8601Format(dateString);
    }
  }
});
</script>

<style lang="scss">
// ==================
// color
$green-1: #008830;
$green-2: #00b849;
$green-3: #00d154;
$green-4: #00eb5e;
$gray-1: #333;
$gray-2: #4d4d4d;
$gray-3: #707070;
$gray-4: #d9d9d9;
$gray-5: #f8f9fa;
$white: #fff;
$link: #006ca8;

// ==================
// shadow
$shadow: 0 0 2px rgba(0, 0, 0, 0.15);

// ==================
// break-points
$huge: 1440;
$large: 1170;
$medium: 768;
$small: 600;
$tiny: 320;

// ==================
// z-index
$z-index-map: (
  opened-side-navigation: 101,
  sp-navigation: 100
);

@function z-index-of($key) {
  @return map-get($z-index-map, $key);
}

// ==================
// media-query
@mixin largerThan($width) {
  @media screen and (min-width: $width + 1 + px) {
    @content;
  }
}

@mixin lessThan($width) {
  @media screen and (max-width: $width + px) {
    @content;
  }
}

// ==================
// font-size
@mixin font-size($size, $base: 16) {
  font-size: $size + px;
  font-size: ($size / $base) + rem;
}

@mixin card-h1 {
  @include font-size(24);

  color: $gray-2;
  font-weight: bold;
}

@mixin card-h2 {
  @include font-size(19);

  color: $gray-2;
  font-weight: bold;
}

@mixin card-h3 {
  @include font-size(16);

  color: $gray-2;
  font-weight: bold;
}

@mixin body-text {
  @include font-size(16);

  color: $gray-1;
  line-height: 160%;
  font-weight: normal;
}

// ===================
// button
@mixin text-link {
  @include font-size(14);

  color: $link !important;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}

@mixin button-text($size: 'md') {
  @if ($size == 'sm') {
    padding: 4px 8px;
  } @else {
    padding: 24px 36px;
  }

  @include font-size(14);

  display: inline-block;
  border-radius: 4px;
  background-color: $white;
  border: 1px solid $green-1;
  color: $green-1;
  cursor: pointer;

  &:hover {
    background-color: $green-1;
    color: $white;

    > i {
      color: $white !important;
    }
  }
}

// ===================
// card
@mixin card-container($withDivider: false) {
  background-color: $white;
  box-shadow: $shadow;
  border: 0.5px solid $gray-4 !important;
  border-radius: 4px;

  @if ($withDivider) {
    &::before {
      content: '';
      position: absolute;
      left: 50%;
      top: 0;
      width: 1px;
      height: 100%;
      background-color: $gray-4;
    }
  }
}
.WhatsNew {
  @include card-container();

  padding: 10px;
  margin-bottom: 20px;
}

.WhatsNew-heading {
  display: flex;
  align-items: center;

  @include card-h2();

  margin-bottom: 12px;
  color: $gray-2;
  margin-left: 12px;

  &-icon {
    margin: 3px;
  }
}

.WhatsNew .WhatsNew-list {
  padding-left: 0;
  list-style-type: none;

  &-item {
    &-anchor {
      display: inline-block;
      text-decoration: none;
      margin: 5px;
      font-size: 14px;

      @include lessThan($medium) {
        display: flex;
        flex-wrap: wrap;
      }

      &-time {
        flex: 0 0 90px;

        @include lessThan($medium) {
          flex: 0 0 100%;
        }

        color: $gray-1;
      }

      &-link {
        flex: 0 1 auto;

        @include text-link();

        @include lessThan($medium) {
          padding-left: 8px;
        }
      }

      &-ExternalLinkIcon {
        margin-left: 2px;
        color: $gray-3 !important;
      }
    }
  }
}
</style>
