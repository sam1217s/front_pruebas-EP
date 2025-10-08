<template>
  <q-card 
    class="card-component"
    flat
    bordered
    @click="navigateTo"
  >
    <q-img
      :src="imgSrc"
      :ratio="16/9"
      class="card-image"
    >
      <div class="absolute-bottom card-overlay">
        <div class="card-content">
          <div class="card-title" :style="{ color: textColor }">{{ title }}</div>
          <div class="card-subtitle" :style="{ color: textColor }">{{ subtitle }}</div>
        </div>
      </div>
    </q-img>

    <q-card-actions align="right" :style="{ backgroundColor: color }">
      <q-btn 
        flat 
        round 
        dense 
        icon="arrow_forward" 
        :color="textColor"
        @click.stop="navigateTo"
      />
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    default: ''
  },
  imgSrc: {
    type: String,
    required: true
  },
  route: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: '#5db82f'
  },
  textColor: {
    type: String,
    default: 'white'
  }
})

function navigateTo() {
  if (props.route) {
    router.push(props.route)
  }
}
</script>

<style scoped>
.card-component {
  width: 100%;
  max-width: 350px;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 2px solid transparent;
}

.card-component:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.25);
  border-color: #5db82f;
}

.card-image {
  position: relative;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.card-overlay {
  padding: 20px;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.9) 0%,
    rgba(0, 0, 0, 0.6) 50%,
    rgba(0, 0, 0, 0.3) 80%,
    transparent 100%
  );
}

.card-content {
  position: relative;
  z-index: 2;
}

.card-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 8px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  line-height: 1.2;
}

.card-subtitle {
  font-size: 0.95rem;
  line-height: 1.4;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7);
  opacity: 0.95;
}

.q-card__actions {
  padding: 12px 16px;
  min-height: 56px;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.1);
}

/* Responsive */
@media (max-width: 1024px) {
  .card-component {
    max-width: 320px;
  }
}

@media (max-width: 768px) {
  .card-component {
    max-width: 100%;
  }
  
  .card-title {
    font-size: 1.25rem;
  }
  
  .card-subtitle {
    font-size: 0.85rem;
  }

  .card-overlay {
    padding: 16px;
  }
}
</style>