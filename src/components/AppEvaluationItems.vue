<template>
  <v-container grid-list-md text-xs-center>
    <v-layout>
      <v-flex>
        <v-card :color="colors" class="py-2">
          <v-layout justify-center>
            <div>
              <div v-for="label in labels.length" :key="label.id">
                <AppEvaluationItem
                  :model="model"
                  @rating-selected="EventConnect"
                  :output="out"
                  :tag-label="labels[label - 1]"
                  :rating="value[label - 1]"
                ></AppEvaluationItem>
              </div>
            </div>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import AppEvaluationItem from '';

export default {
  components: { AppEvaluationItem },
  name: 'AppEvaluationItems',
  props: {
    labels: {
      type: Array,
      required: true
    },
    value: {
      type: Array,
      default: () => []
    },
    out: {
      type: Boolean,
      requires: true
    },
    colors: {
      type: String
    },
    model: {
      default: undefined
    }
  },

  methods: {
    EventConnect: function(val, label) {
      this.$emit('rating-selected', label, val);
    }
  }
};
</script>
