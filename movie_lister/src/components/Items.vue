<template>
    <v-container v-if="!getProgress">
        <v-item-group v-if=" itemsWithPoster.length>0">
            <v-row>                                
                <v-btn
                    icon
                    v-show=" itemsWithPoster.length>5"
                    class="ma-8"
                    v-on:click="decreasePageNum()">
                    <v-icon>mdi-arrow-left</v-icon>
                </v-btn>                    
                <v-col
                v-for="index in limit = itemsWithPoster.length >= 5 ? 5 : itemsWithPoster.length" :key="index">
                    <v-img
                        height="375"
                        width="250"
                        v-on:click="setEnabledItem( itemsWithPoster[(index-1+(5*pageNum))% itemsWithPoster.length]), enable = true"
                        :src=" itemsWithPoster[(index-1+(5*pageNum))% itemsWithPoster.length].Poster"
                        class="ma-auto cursorPointer"
                    ></v-img>
                    <h3 class="text-center mt-5 grey--text mb-2 cursorPointer">
                        {{ itemsWithPoster[(index-1+(5*pageNum))% itemsWithPoster.length ].Title}}
                    </h3>
                </v-col>                
                    <v-dialog
                        v-model="enable"
                        width="500">
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
                    v-show=" itemsWithPoster.length>5"
                    class="ma-8"
                    v-on:click="increasePageNum()">
                    <v-icon class="ma-auto">mdi-arrow-right</v-icon>
                </v-btn> 
            </v-row>
        </v-item-group>
    </v-container>
    <v-layout align-center justify-center column v-else class="mt-16">
    <v-progress-circular
        indeterminate
        color="primary"
    ></v-progress-circular>
    </v-layout>
</template>

<script>

import { ref, watch } from '@vue/composition-api';
import Vue from 'vue';
import vBlur from 'v-blur';
import { getItems, getProgress } from '../store';

Vue.use(vBlur)

export default({

    name: 'items',    

    props: {

        title: String
    },

    setup(props) {
        
        const pageNum = ref(1)

        const enable = ref(false)

        const enabledItem = ref(Object)

        const itemsWithPoster = ref([])

        const blurConfig = {

            isBlurred: true,
            filter: 'blur(4.5px)',
            transition: 'all .3s linear'          
        }

        watch([getItems, getProgress], () => {

            if(!getProgress.value){

                itemsWithPoster.value = []

                if(getItems.value.length > 0) {

                    getItems.value.forEach(item => {

                        if(item.Title.toLowerCase().includes(props.title.toLowerCase())) {

                            itemsWithPoster.value.push(item)
                        }
                    })
                }

                else {

                    itemsWithPoster.value = []
                }
                
            }
        });

        const setEnabledItem = (item) => {

            enabledItem.value = item
        }

        const decreasePageNum = () => {

            if(pageNum.value == 0) {
                
                pageNum.value = (itemsWithPoster.value.length/5)+1
            }

            else {
                
                pageNum.value = pageNum.value-1
            }
        }

        const increasePageNum = () => {

            if(pageNum.value == (itemsWithPoster.value.length/5)+1) {
                
                pageNum.value = 0
            }

            else {
                
                pageNum.value = pageNum.value+1
            }
        }

        return {

            pageNum,
            decreasePageNum,
            increasePageNum,
            enable,
            setEnabledItem,
            enabledItem,
            blurConfig,
            itemsWithPoster,
            getProgress
        }
    }

})
</script>

<style>

    .cursorPointer {

        cursor: pointer;
    }
</style>
