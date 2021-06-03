<template>
    <v-container>
        <v-item-group v-if="list.length>0">
            <v-row>                                
                <v-btn
                    icon
                    v-show="list.length>5"
                    class="ma-8"
                    v-on:click="decreasePageNum(list)"
                >
                    <v-icon>mdi-arrow-left</v-icon>
                </v-btn>                    
                <v-col
                v-for="index in limit = list.length >= 5 ? 5 : list.length" :key="index"
                > 
                    <v-img
                        height="375"
                        width="250"
                        v-on:click="setEnabledItem(list[(index-1+(5*pageNum))%list.length]), enable = true"
                        :src="list[(index-1+(5*pageNum))%list.length].Poster"
                        class="ma-auto cursorPointer"
                    ></v-img>
                    <h3 class="text-center mt-5 grey--text mb-2 cursorPointer">
                        {{list[(index-1+(5*pageNum))%list.length ].Title}}
                    </h3>
                </v-col>                
                    <v-dialog
                        v-model="enable"
                        width="500"
                    >
                        <v-card>
                            <v-img
                                height="300"
                                width="500"
                                :src="enabledItem.Poster"
                                class="ma-auto cursorPointer"
                                v-blur="blurConfig"
                            ></v-img>

                            <v-card-title>                            
                                {{enabledItem.Title}}                           
                            </v-card-title>

                            <v-card-text>                            
                                {{enabledItem.Plot}}
                                <br />
                                <br />
                                Duration: {{enabledItem.Runtime}}
                                <br />
                                <br />                             
                                IMDB:   {{enabledItem.imdbRating}}
                                <br />
                                <br /> 
                                Genre: {{enabledItem.Genre}}
                                <br />
                                <br />
                                Cast: {{enabledItem.Actors}}
                                <br />
                                <br />
                                Director: {{enabledItem.Director}}  
                            </v-card-text>

                            <v-card-actions class="justify-center">
                                <v-btn
                                    color="primary"
                                    text
                                    v-on:click="enable = false"
                                >
                                   <v-icon class="ma-auto">mdi-arrow-down</v-icon>
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                <v-btn
                    icon
                    v-show="list.length>5"
                    class="ma-8"
                    v-on:click="increasePageNum(list)"
                >
                    <v-icon class="ma-auto">mdi-arrow-right</v-icon>
                </v-btn> 
            </v-row>
        </v-item-group>
    </v-container>
</template>

<script>

import { ref } from '@vue/composition-api';
import Vue from 'vue'
import vBlur from 'v-blur'

Vue.use(vBlur)

export default({
    name: 'items',

    props: {

        list: {
            type: Array
        }
    },

    setup() {
        
        const pageNum = ref(1)

        const enable = ref(false)

        const enabledItem = ref(Object)

        const blurConfig = {
            isBlurred: true,
            filter: 'blur(4.5px)',
            transition: 'all .3s linear'          
        }

        const decreasePageNum = (list) => {

            if(pageNum.value == 0) {
                
                pageNum.value = (list.length/5)+1
            }

            else {
                
                pageNum.value = pageNum.value-1
            }
        }

        const setEnabledItem = (item) => {

            enabledItem.value = item
        }

        const increasePageNum = (list) => {

            if(pageNum.value == (list.length/5)+1) {
                
                pageNum.value = 0
            }

            else {
                
                pageNum.value = pageNum.value+1
            }
        }

        return{
            pageNum,
            decreasePageNum,
            increasePageNum,
            enable,
            setEnabledItem,
            enabledItem,
            blurConfig
        }
    }

})
</script>

<style>
    ul, li {

        display:inline
    }

    .cursorPointer {

        cursor: pointer;
    }

</style>
