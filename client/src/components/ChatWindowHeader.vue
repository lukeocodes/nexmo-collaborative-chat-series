<template>
  <div class="border-b flex px-6 py-2 items-center">
    <div class="flex flex-col">
      <h4 class="text-grey-darkest mb-1 font-extrabold">{{ channelName }}</h4>
      <span class="text-sm">
        <font-awesome-icon icon="users" class="h-4 w-4 inline-block fill-current"/>
        {{ members }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatWindowHeader',
  props: {
    channelName: String,
    members: Number
  }
}
</script>