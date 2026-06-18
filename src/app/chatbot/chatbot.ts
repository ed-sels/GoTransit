import { Component, OnInit, OnDestroy } from '@angular/core';
import Chatbot from 'flowise-embed/dist/web';

@Component({
  selector: 'app-flowise-chatbot',
  standalone: true,
  template: ``,
})
export class FlowiseChatbotComponent implements OnInit, OnDestroy {

  ngOnInit(): void {
    this.initializeAgent();
  }

  initializeAgent(): void {
    Chatbot.init({
      chatflowid: '1c26e490-71c7-4307-9125-617731db477a',
      apiHost: 'https://cloud.flowiseai.com',
      theme: {
        button: {
          backgroundColor: '#c1b20fff', // Customize to match your layout branding
          right: 25,
          bottom: 25,
          size: 'medium'
        },
        chatWindow: {
          showTitle: true,
          title: 'AI Agent Assistant',
          welcomeMessage: 'Hello! How can I assist you with this agent workflow today?',
          backgroundColor: '#878787ff',
          fontSize: 15
        }
      }
    });
  }

  ngOnDestroy(): void {
    const botElement = document.querySelector('flowise-chatbot');
    if (botElement) {
      botElement.remove();
    }
  }
}
