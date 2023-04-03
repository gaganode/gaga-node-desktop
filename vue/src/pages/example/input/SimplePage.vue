<script setup>
import { EnvelopeIcon, QuestionMarkCircleIcon, KeyIcon, PaperAirplaneIcon, ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/vue/24/outline";

import SidebarLayout from "../../../layouts/sidebar/SidebarLayout.vue";
</script>

<template>
  <SidebarLayout>
    <div class="space-y-8 divide-y divide-gray-200 divide-gray-200">
      <div>
        <h1 class="text-2xl leading-6">Examples of input</h1>
        <p class="mt-3">Different types of input with code</p>
      </div>

      <div class="pt-5 lg:grid lg:grid-cols-3 lg:gap-4">
        <div>
          <label for="username" class="flex">Simple input</label>
          <p>simple style of input</p>
        </div>
        <div class="lg:col-span-2 mt-2">
          <input type="email" name="email" id="email" class="rounded mt-1" placeholder="you@example.com" />
        </div>
      </div>

      <div class="pt-5 lg:grid lg:grid-cols-3 lg:gap-4">
        <div>
          <label for="username" class="flex">Input with text prefix</label>
          <p>A text can be put in the front of input , adjust the pl-{x} according to the prefix variable length</p>
        </div>
        <div class="lg:col-span-2 mt-2">
          <div class="input-wrap">
            <div class="prefix">http://</div>
            <input type="text" name="company-website" id="company-website" class="rounded pl-14" placeholder="www.example.com" />
          </div>
        </div>
      </div>

      <div class="pt-5 lg:grid lg:grid-cols-3 lg:gap-4">
        <div>
          <label for="username" class="flex">Disabled input</label>
          <p>Input is disabled</p>
        </div>
        <div class="lg:col-span-2 mt-2">
          <input type="email" name="email" id="email" value="you@example.com" disabled="" class="rounded disabled mt-1" placeholder="you@example.com" />
        </div>
      </div>

      <div class="pt-5 lg:grid lg:grid-cols-3 lg:gap-4">
        <div>
          <label for="username" class="flex">Input with icron prefix</label>
          <p>Icon can be put in the front of input box</p>
        </div>
        <div class="lg:col-span-2 mt-2">
          <div class="input-wrap">
            <div class="prefix">
              <EnvelopeIcon class="icon" />
            </div>
            <input type="email" name="email" id="email" class="rounded pl-10" placeholder="you@example.com" />
          </div>
        </div>
      </div>

      <div class="pt-5 lg:grid lg:grid-cols-3 lg:gap-4">
        <div>
          <label for="username" class="flex">Input with icron suffix</label>
          <p>Icon can be put in the end of input box</p>
        </div>
        <div class="lg:col-span-2 mt-2">
          <div class="input-wrap mt-1">
            <input type="text" name="account-number" id="account-number" class="rounded" placeholder="000-00-0000" />
            <div class="suffix">
              <QuestionMarkCircleIcon class="h-5 w-5" />
            </div>
          </div>
        </div>
      </div>

      <div class="pt-5 lg:grid lg:grid-cols-3 lg:gap-4">
        <div>
          <label for="username" class="flex">Input with prefix and suffix text</label>
          <p>text can be put in the front and in the end of input box</p>
        </div>
        <div class="lg:col-span-2 mt-2">
          <div class="input-wrap mt-1">
            <div class="prefix">$</div>
            <input type="text" name="price" id="price" class="rounded pl-7 pr-12" placeholder="0.00" />
            <div class="suffix">USD</div>
          </div>
        </div>
      </div>

      <div class="pt-5 lg:grid lg:grid-cols-3 lg:gap-4">
        <div>
          <label for="username" class="flex">Input with prefix selector</label>
          <p>selector can be put in the front of input box</p>
        </div>
        <div class="lg:col-span-2 mt-2">
          <div class="input-wrap">
            <div class="prefix">
              <select id="country" name="country" autocomplete="country">
                <option>US</option>
                <option>CA</option>
                <option>EU</option>
              </select>
            </div>
            <input type="text" name="phone-number" id="phone-number" class="rounded pl-18" placeholder="+1 (555) 987-6543" />
          </div>
        </div>
      </div>

      <div class="pt-5 lg:grid lg:grid-cols-3 lg:gap-4">
        <div>
          <label for="username" class="flex">Input with suffix selector</label>
          <p>selector can be put in the end of input box</p>
        </div>
        <div class="lg:col-span-2 mt-2">
          <div class="input-wrap">
            <span class="prefix">$</span>
            <input type="text" name="price" id="price" class="rounded pl-7 pr-12" placeholder="0.00" />
            <div class="suffix">
              <select id="currency" name="currency">
                <option>USD</option>
                <option>CAD</option>
                <option>EUR</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div class="pt-5 lg:grid lg:grid-cols-3 lg:gap-4">
        <div>
          <label for="username" class="flex">Input with gray background</label>
          <p>gray background</p>
        </div>
        <div class="lg:col-span-2 mt-2">
          <input type="text" name="name" id="name" class="rounded bg-gray-50" placeholder="Jane Smith" />
        </div>
      </div>

      <div class="pt-5 lg:grid lg:grid-cols-3 lg:gap-4">
        <div>
          <label for="username" class="flex">Input with search mark</label>
          <p>search mark suffix</p>
        </div>
        <div class="lg:col-span-2 mt-2">
          <div class="input-wrap">
            <input type="text" class="rounded" name="search" id="search" />
            <div class="suffix">
              <kbd>⌘K</kbd>
            </div>
          </div>
        </div>
      </div>

      <div class="pt-5 lg:grid lg:grid-cols-3 lg:gap-4">
        <div>
          <label for="username" class="flex">Input with right button</label>
          <p>input with right button</p>
        </div>

        <div class="lg:col-span-2 mt-2">
          <div class="btn-input-wrap">
            <div class="input-wrap">
              <div class="prefix">
                <EnvelopeIcon class="icon" />
              </div>
              <input type="email" name="email" id="email" class="pl-10" placeholder="your@email" />
            </div>
            <div class="btn -ml-px"><PaperAirplaneIcon class="h-5 w-5"/> Send me the code</div>
          </div>
        </div>
      </div>


      <div class="pt-5 lg:grid lg:grid-cols-3 lg:gap-4">
        <div>
          <label for="username" class="flex">Input with let tab</label>
          <p>input with left tab</p>
        </div>

        <div class="lg:col-span-2 mt-2">
          <div class="btn-input-wrap">
            <div class="tab -mr-px">Some text:</div>
            <div class="input-wrap">
              <input type="email" name="email" id="email" placeholder="your@email" />
            </div>
          </div>
        </div>
      </div>


      <div class="pt-5 lg:grid lg:grid-cols-3 lg:gap-4">
        <div>
          <label for="username" class="flex">Multi grouped form</label>
          <p>a form of multi lines</p>
        </div>
        <div class="lg:col-span-2 mt-2">
          <div class="input-wrap -space-y-px rounded-md shadow-sm">
            <input id="email-address" name="email" type="email" autocomplete="email" class="relative rounded-t" placeholder="Email address" />
            <input id="email-address" name="email" type="text" required="" class="relative" placeholder="mid address" />
            <input id="password" name="password" type="password" autocomplete="current-password" class="relative rounded-b" placeholder="Password" />
          </div>
        </div>
      </div>

      <div class="pt-5 lg:grid lg:grid-cols-3 lg:gap-4">
        <div>
          <label for="username" class="flex">Multi grouped form with icon</label>
          <p>a form of multi lines with icon</p>
        </div>
        <div class="lg:col-span-2 mt-2">
          <div class="-space-y-px mt-3 mb-5">
            <div class="input-wrap">
              <div class="prefix">
                <EnvelopeIcon class="icon" />
              </div>
              <input id="email" name="email" type="email" autocomplete="email" class="relative pl-10 rounded-t" placeholder="your email" />
            </div>

            <div class="input-wrap">
              <div class="prefix">
                <KeyIcon class="icon" />
              </div>
              <input id="password" name="password" type="password" autocomplete="current-password" class="relative pl-10 rounded-b" placeholder="your password" />
            </div>
          </div>
        </div>
      </div>

      <div class="pt-5 lg:grid lg:grid-cols-3 lg:gap-4">
        <div>
          <label for="username" class="flex">Multi grouped form with header</label>
          <p>a form of multi lines which has header</p>
        </div>
        <div class="lg:col-span-2 mt-2">
          <div class="input-wrap isolate -space-y-px">
            <div class="relative rounded-md rounded-b-none border border-gray-300 px-3 py-2 focus-within-border:primary">
              <label>Name</label>
              <input type="text" name="name" id="name" class="border-none p-0 focus:ring-0" placeholder="Jane Smith" />
            </div>

            <div class="relative border border-gray-300 px-3 py-2 focus-within-border:primary">
              <label>Name</label>
              <input type="text" name="name" id="name" class="border-0 p-0 focus:ring-0" placeholder="Jane Smith" />
            </div>

            <div class="relative rounded-md rounded-t-none border border-gray-300 px-3 py-2 focus-within-border:primary">
              <label>Job Title</label>
              <input type="text" name="job-title" id="job-title" class="b border-0 p-0 focus:ring-0" placeholder="Head of Tomfoolery" />
            </div>
          </div>
        </div>
      </div>

      <div class="pt-5 lg:grid lg:grid-cols-3 lg:gap-4">
        <div>
          <label for="username" class="flex">two cols in one input</label>
          <p>cols style input,a card input example</p>
        </div>
        <div class="lg:col-span-2 mt-2">
          <div class="input-wrap -space-y-px">
            <input type="text" name="card-number" id="card-number" class="relative rounded-t" placeholder="Card number" />
            <div class="flex -space-x-px">
              <input type="text" name="card-expiration-date" id="card-expiration-date" class="w-1/2 relative rounded-bl" placeholder="MM / YY" />
              <input type="text" name="card-cvc" id="card-cvc" class="w-1/2 relative rounded-br" placeholder="CVC" />
            </div>
          </div>
        </div>
      </div>

      <div class="pt-5 lg:grid lg:grid-cols-3 lg:gap-4">
        <div>
          <label for="username" class="flex">grouped form with selector</label>
          <p>selector input in a group input</p>
        </div>
        <div class="lg:col-span-2 mt-2">
          <div class="input-wrap -space-y-px">
            <select id="country" name="country" autocomplete="country-name" class="relative rounded-t">
              <option>United States</option>
              <option>Canada</option>
              <option>Mexico</option>
            </select>
            <input type="text" name="postal-code" id="postal-code" autocomplete="postal-code" class="relative rounded-none rounded-b-md" placeholder="ZIP / Postal code" />
          </div>
        </div>
      </div>
    </div>
  </SidebarLayout>
</template>
