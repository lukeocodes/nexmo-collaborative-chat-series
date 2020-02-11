<template>
  <div class="pb-6 px-4">
    <textarea
      v-bind:value="inputMessage"
      v-on:input="inputMessage = $event.target.value"
      v-on:keydown.enter.exact.prevent
      v-on:keyup.enter.exact="message"
      v-on:keyup.enter.shift="resize"
      v-on:keyup.backspace.exact="resize"
      type="text"
      :placeholder="'Message #' + conversation.display_name"
      class="w-full rounded-lg border-2 border-grey overflow-hidden py-2 px-4 resize-none"
      rows="1"
      ref="inputBox"
    >
    </textarea>
  </div>
</template>

<script>
export default {
  name: 'ChatWindowFooter',
  props: {
    conversation: Object,
  },
  data () {
    return {
      inputMessage: '',
      initialHeight: 38,  // default height for the message box
      height: 38  // default height for the message box
    }
  },
  methods: {
    resize () {
      const inputRows = this.inputMessage.split(/\r?\n/).length
      this.$refs.inputBox.rows = inputRows
      this.$emit('inputRows', inputRows)
    },
    message () {
      // console.log() // eslint-disable-line no-console
      if (this.inputMessage.replace(/\s/g,'').length > 0) {
        this.$props.conversation
          .sendText(this.inputMessage.trim())
          .then(() => {
            this.$emit('sendText', this.inputMessage)
            this.height = this.initialHeight;
            this.inputMessage = ''
            this.resize()
          })
          .catch(err => {
            console.error(err) // eslint-disable-line no-console
            // this.$parent.error = { title: 'Chat Service Error', message: err.reason } // todo: determine if this is good practice to pass the error up the component tree
          })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>