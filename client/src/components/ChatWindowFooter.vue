<template>
  <div class="px-4">
    <textarea
      v-bind:class="{ 
        'disabled:opacity-75': isSending,
        'bg-gray-300': isSending,
        'border-gray-400': isSending,
        'border-gray-400': !isSending
      }"
      v-bind:disabled="isSending"
      v-bind:value="inputMessage"
      v-on:input="inputMessage = $event.target.value"
      v-on:keydown.enter.exact.prevent
      v-on:keyup.enter.exact="sendMessage"
      v-on:keyup="typingEvents"
      type="text"
      :placeholder="'Message #' + conversation.display_name"
      class="w-full rounded-lg border-2 overflow-hidden py-2 px-4 resize-none"
      rows="1"
      ref="inputBox"
    >
    </textarea>
    <div class="grid grid-cols-10 h-6 text-xs">
      <div class="col-span-5 text-gray-600 pl-2">
        <template v-if="numbersTyping > 0">
          <span v-for="(member, key, index) in membersTyping" v-bind:key="'member' + key">
            {{ member.display_name }}
            <span v-if="index != Object.keys(membersTyping).length - 1">, </span>
          </span>
           is typing...
        </template>
      </div>
      <div class="col-span-5 text-right text-gray-600 pr-2">
        <template v-if="inputMessage.length > 2">
          <span class="font-bold">Return</span> to send <span class="font-bold ml-2">Shift + Return</span> to add a new line
        </template>
      </div>
    </div>
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
      membersTyping: {},
      numbersTyping: 0,
      isTyping: null,
      isSending: false
    }
  },
  mounted () {
    this.registerListeners()
  },
  methods: {
    registerListeners () {
      const { conversation } = this.$props

      conversation.on("text:typing:on", (member) => {
        this.membersTyping[member.id] = member
        this.numbersTyping = Object.keys(this.membersTyping).length
      })

      conversation.on("text:typing:off", (member) => {
        delete(this.membersTyping[member.id])
        this.numbersTyping = Object.keys(this.membersTyping).length
      })
    },
    isTypingKeyCheck (event) {
      const { location, ctrlKey, altKey, metaKey, key } = event

      return ![1,2,3].includes(location) && !ctrlKey && !altKey && !metaKey && key !== "Backspace"
    },
    sendTypingEvents () {
      if (this.isTypingKeyCheck(event)) {
        if (!this.isTyping) {
          this.$props.conversation.startTyping()
        }

        clearTimeout(this.isTyping)
        this.isTyping = setTimeout(() => {
          this.$props.conversation.stopTyping()
          this.isTyping = null
        }, 3000)
      }
    },
    typingEvents (event) {
      this.resizeInput()
      this.sendTypingEvents(event)
    },
    resizeInput () {
      const inputRows = this.inputMessage.split(/\r?\n/).length
      this.$refs.inputBox.rows = inputRows
      this.$emit('resizeInput', inputRows)
    },
    sendMessage () {
      if (this.inputMessage.replace(/\s/g,'').length > 0) {
        this.isSending = true
        this.$emit('sendText', this.inputMessage)

        this.$props.conversation
          .sendText(this.inputMessage.trim())
          .then(() => {
            this.isSending = false
            this.$nextTick(() => {
              this.$refs.inputBox.focus()
              this.$emit('sendText', '')
              this.inputMessage = ''
              this.resizeInput()
            });
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