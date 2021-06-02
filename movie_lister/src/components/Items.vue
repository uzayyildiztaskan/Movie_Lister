<template>
    <v-hover
    close-delay="105"
    >
        <v-container>
            <v-item-group v-if="list.length>0">
                <v-row>                                
                    <v-btn
                        icon
                        v-show="list.length>5"
                        class="ma-8"
                        @click="decreasePageNum(list)"
                    >
                        <v-icon>mdi-arrow-left</v-icon>
                    </v-btn>                    
                    <v-col
                    v-for="index in 5" :key="index"
                    > 
                        <v-img
                            height="375"
                            width="250"
                            :src="list[(index-1+(5*pageNum))%list.length].Poster"
                            class="ma-auto"
                        ></v-img>
                    <h3 class="text-center mt-5 grey--text mb-2">
                        {{list[(index-1+(5*pageNum))%list.length ].Title}}
                    </h3>
                    </v-col>
                    <v-btn
                        icon
                        v-show="list.length>5"
                        class="ma-8"
                        @click="increasePageNum(list)"
                    >
                        <v-icon class="ma-auto">mdi-arrow-right</v-icon>
                    </v-btn> 
                </v-row>
            </v-item-group>
        </v-container>
    </v-hover>
</template>

<script>

import { ref } from '@vue/composition-api';

export default({
    name: 'items',

    props: {

        list: {
            type: Array
        }
    },

    setup() {
        
        const pageNum = ref(1)

        const decreasePageNum = (list) => {

            if(pageNum.value == 0) {
                
                pageNum.value = (list.length/5)+1
            }

            else {
                
                pageNum.value = pageNum.value-1
            }
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
            increasePageNum
        }
    }

})
</script>

<style>
    ul, li {
        display:inline
    }

</style>
