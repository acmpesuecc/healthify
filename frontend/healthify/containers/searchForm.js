import React from "react";
import {StyleSheet, Button, TextInput, View, Text} from "react-native";
import {Formik} from 'formik';

//to be done

// styling
// add date picker to choose date from {start_date, end_date} 
// add time picker to choose time from  {time}
// add drop downs for {type, everyday}



export default function searchForm()
{

    return(
        <View>
            <Formik
                initialValues={{
                    name: '',
                    type: '',  //Pills, Injections, Solutions
                    dosage: '',
                    everyday: '', // yes or no
                    frequency: '',
                    time_of_day: '', // morning, afternoon, evening
                    time: '',
                    interval: '',
                    start_date: '',
                    end_date: ''
                }} // initial values of the form fields
                onSubmit={(values)=>{
                    console.log(values)
                }}
            >
                {(formikprops)=>(
                    <View>
                        <TextInput 
                            placeholder="Name of Medicine"
                            onChangeText={formikprops.handleChange('name')}
                            value={formikprops.values.name}
                        />

                        <TextInput 
                            placeholder="Type of Medicine"
                            onChangeText={formikprops.handleChange('type')}
                            value={formikprops.values.type}
                        />
                        
                        <TextInput 
                            placeholder="Dosage" 
                            onChangeText={formikprops.handleChange('dosage')}
                            value={formikprops.values.dosage}
                        />
                          
                        <TextInput 
                            placeholder="Consume this everyday?" // yes or no
                            onChangeText={formikprops.handleChange('everyday')}
                            value={formikprops.values.everyday}
                        />
                        
                        <TextInput 
                            placeholder="Frequency"
                            keyboardType="numeric"
                            onChangeText={formikprops.handleChange('frequency')}
                            value={formikprops.values.frequency}
                        />

                        <TextInput 
                            placeholder="Time of day" // morning, afternoon, evening
                            onChangeText={formikprops.handleChange('time_of_day')}
                            value={formikprops.values.time_of_day}
                        />

                        <TextInput 
                            placeholder="Time" // morning, afternoon, evening
                            onChangeText={formikprops.handleChange('time')}
                            value={formikprops.values.time}
                        />
                        <TextInput 
                            placeholder="Interval"// If its not a daily medicine, then this is the number of days ; If its a daily medicine, then this is the number of hours between two doses.
                            onChangeText={formikprops.handleChange('interval')}
                            value={formikprops.values.interval}
                        />

                        <TextInput 
                            placeholder="Start date" 
                            onChangeText={formikprops.handleChange('start_date')}
                            value={formikprops.values.start_date}
                        />                        

                        <TextInput 
                            placeholder="End date" 
                            onChangeText={formikprops.handleChange('end_date')}
                            value={formikprops.values.end_date}
                        />                        


                    <Button title="SUBMIT" color="maroon" onPress={formikprops.handleSubmit}/>
                    </View>
                )}
            </Formik>
        </View>
    )
}
