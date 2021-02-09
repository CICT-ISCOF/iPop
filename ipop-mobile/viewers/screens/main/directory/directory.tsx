import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import TopPadding from '../../../shared/top-padding/top-padding';

export default function Directory() {
    const colorScheme = useColorScheme();

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 20,
            paddingTop: 50,
        },
        menu: {
            fontWeight: '700',
            fontSize: 35,
            width: '70%',
            marginBottom: 30,
        },
        divisions: {
            fontWeight: '700',
            fontSize: 25,
            color: '#356F81',
            paddingTop: 30,
        },
        name: {
            fontSize: 20,
            marginTop: 20,
            color: Colors[colorScheme].text,
        },
        position: {
            color: Colors[colorScheme].text1,
        },
    });

    return (
        <View style={[styles.container, { padding: 0 }]}>
            <TopPadding />
            <ScrollView
                style={[
                    styles.container,
                    {
                        backgroundColor: Colors[colorScheme].bg1,
                    },
                ]}>
                <BackContainer hidden={true} />
                <Text
                    style={[styles.menu, { color: Colors[colorScheme].text }]}>
                    Personnel Directory
                </Text>
                <View>
                    <Text style={styles.name}>Ramon C. Yee, MPG</Text>
                    <Text style={styles.position}>
                        Provincial Population Officer ppo@iloilo.gov.ph, (033)
                        509-5081
                    </Text>
                </View>

                <Text style={styles.divisions}>ADMINISTRATIVE DIVISION</Text>

                <View>
                    <Text style={styles.name}>Ma. Hayde P. Padilla</Text>
                    <Text style={styles.position}>
                        OIC - Administrative Division (insert contact details)
                    </Text>
                </View>
                <View>
                    <Text style={styles.name}>Gilda M. Borja</Text>
                    <Text style={styles.position}>
                        OIC - Records Section, Administrative Assistant I
                    </Text>
                </View>
                <View>
                    <Text style={styles.name}>Lynde Q. Dadivas</Text>
                    <Text style={styles.position}>
                        OIC - Administrative Division (insert contact details)
                    </Text>
                </View>
                <View>
                    <Text style={styles.name}>Carlos N. Alli</Text>
                    <Text style={styles.position}>Administrative Aide V</Text>
                </View>
                <View>
                    <Text style={styles.name}>Melody T. Gomez</Text>
                    <Text style={styles.position}>Administrative Aide VI</Text>
                </View>
                <View>
                    <Text style={styles.name}>Rufino P. Sancho</Text>
                    <Text style={styles.position}>Driver II (detailed)</Text>
                </View>
                <View>
                    <Text style={styles.name}>Reygen P. Adelantar</Text>
                    <Text style={styles.position}>
                        Administrative Aide I (detailed)
                    </Text>
                </View>

                <Text style={styles.divisions}>
                    TRAINING AND RESEARCH DIVISION
                </Text>

                <View>
                    <Text style={styles.name}>Shiela Mae C. Tuares</Text>
                    <Text style={styles.position}>
                        OIC – Trining and Research Division
                    </Text>
                </View>
                <View>
                    <Text style={styles.name}>Ma. Hayde P. Padilla</Text>
                    <Text style={styles.position}>Statistician II</Text>
                </View>
                <View>
                    <Text style={styles.name}>Jessa P. Salido</Text>
                    <Text style={styles.position}>
                        Population Program Officer I
                    </Text>
                </View>

                <Text style={styles.divisions}>FIELD OPERATIONS DIVISION</Text>

                <View>
                    <Text style={[styles.name, { color: 'orange' }]}>
                        District I
                    </Text>
                    <Text style={styles.position}></Text>
                </View>
                <View>
                    <Text style={styles.name}>Janel T. Tejida</Text>
                    <Text style={styles.position}>
                        Population Program Officer II
                    </Text>
                </View>
                <View>
                    <Text style={styles.name}>Pete Mhee G. Grajales</Text>
                    <Text style={styles.position}>
                        Population Program Officer I – Guimba
                    </Text>
                </View>
                <View>
                    <Text style={styles.name}>John Niño T. Escorpion</Text>
                    <Text style={styles.position}>
                        Population Program Officer I – Igbaras
                    </Text>
                </View>
                <View>
                    <Text style={styles.name}>Eireen P. Digcabo-on</Text>
                    <Text style={styles.position}>
                        Population Program Officer I – Miag-ao
                    </Text>
                </View>

                <View>
                    <Text style={styles.name}>Sheina Marie G. Gacho</Text>
                    <Text style={styles.position}>
                        Population Program Officer I – Oton
                    </Text>
                </View>
                <View>
                    <Text style={styles.name}>Elah Dar Elijah Sandig</Text>
                    <Text style={styles.position}>
                        Population Program Officer I – San Joaquin
                    </Text>
                </View>
                <View>
                    <Text style={styles.name}>Lenny C. Somblingo</Text>
                    <Text style={styles.position}>
                        Population Program Officer I – Tigbauan
                    </Text>
                </View>
                <View>
                    <Text style={styles.name}>Edgar Voltaire T. Garcia</Text>
                    <Text style={styles.position}>
                        Population Program Officer I – Tubungan
                    </Text>
                </View>
                <View>
                    <Text style={[styles.name, { color: 'orange' }]}>
                        District II
                    </Text>
                    <Text style={styles.position}></Text>
                </View>
                <View>
                    <Text style={styles.name}>Ma. Mininia S. Naranja</Text>
                    <Text style={styles.position}>
                        Population Program Officer II
                    </Text>
                </View>
                <View>
                    <Text style={styles.name}>April Kate K. Amada</Text>
                    <Text style={styles.position}>
                        Population Program Officer I – Alimodian
                    </Text>
                </View>
                <View>
                    <Text style={styles.name}>Barry T. Basiya</Text>
                    <Text style={styles.position}>
                        Population Program Officer I – Leganes
                    </Text>
                </View>
                <View>
                    <Text style={styles.name}>Mary Ann E. Cambalo</Text>
                    <Text style={styles.position}>
                        Population Program Officer I – Leon
                    </Text>
                </View>
                <View>
                    <Text style={styles.name}>Ma. Simar P. Simora</Text>
                    <Text style={styles.position}>
                        Population Program Officer I – New Lucena
                    </Text>
                </View>
                <View>
                    <Text style={styles.name}>May M. Robles</Text>
                    <Text style={styles.position}>
                        Population Program Officer I – Pavia
                    </Text>
                </View>

                <View>
                    <Text style={styles.name}>Ruth A. Lujan</Text>
                    <Text style={styles.position}>
                        Population Program Officer I – San Miguel
                    </Text>
                </View>
                <View>
                    <Text style={styles.name}>Eve Chacel S. Mondeja</Text>
                    <Text style={styles.position}>
                        Population Program Officer I – Sta. Barbara
                    </Text>
                </View>
                <View>
                    <Text style={styles.name}>Hazel P. Defensor</Text>
                    <Text style={styles.position}>
                        Population Program Officer I – Zarraga
                    </Text>
                </View>
                <View>
                    <Text style={[styles.name, { color: 'orange' }]}>
                        District III
                    </Text>
                    <Text style={styles.position}></Text>
                </View>
                <View>
                    <Text style={styles.name}>Preciosa Gallaron</Text>
                    <Text style={styles.position}>
                        Population Program Officer I – Janiuay
                    </Text>
                </View>
                <View>
                    <Text style={styles.name}>Lilibeth M. Cachite</Text>
                    <Text style={styles.position}>
                        Population Program Officer I – Bingawan
                    </Text>
                </View>
                <View>
                    <Text style={styles.name}>Shiela Mae C. Tuares</Text>
                    <Text style={styles.position}>
                        Population Program Officer I – Cabatuan
                    </Text>
                </View>
                <View>
                    <Text style={styles.name}>Chona Lynn C. Contreras</Text>
                    <Text style={styles.position}>
                        Population Program Officer I – Calinog
                    </Text>
                </View>
                <View>
                    <Text style={styles.name}>Concepcion E. Gerardino</Text>
                    <Text style={styles.position}>
                        Population Program Officer I – Lambunao
                    </Text>
                </View>
                <View>
                    <Text style={styles.name}>Richard S. Magullado</Text>
                    <Text style={styles.position}>
                        Population Program Officer I – Maasin
                    </Text>
                </View>
                <View>
                    <Text style={styles.name}>Richard S. Magullado</Text>
                    <Text style={styles.position}>
                        Population Program Officer I – Maasin
                    </Text>
                </View>

                <View>
                    <Text style={styles.name}>Jera Mae L. Alojado</Text>
                    <Text style={styles.position}>
                        Population Program Officer I – Mina
                    </Text>
                </View>
                <View>
                    <Text style={styles.name}>Genalyn P. Villa</Text>
                    <Text style={styles.position}>
                        Population Program Officer I – Pototan
                    </Text>
                </View>
                <View>
                    <Text style={[styles.name, { color: 'orange' }]}>
                        District IV
                    </Text>
                    <Text style={styles.position}></Text>
                </View>
                <View>
                    <Text style={styles.name}>Rhea L. Decasa</Text>
                    <Text style={styles.position}>
                        Population Program Officer II
                    </Text>
                </View>
                <View>
                    <Text style={styles.name}>Ma. Sherrybel P. Decastillo</Text>
                    <Text style={styles.position}>
                        Population Program Officer I – Anilao
                    </Text>
                </View>
                <View>
                    <Text style={styles.name}>Ma. Airis S. Penetrante</Text>
                    <Text style={styles.position}>
                        Population Program Officer I – Banate
                    </Text>
                </View>
                <View>
                    <Text style={styles.name}>Chalea D. Cabayao</Text>
                    <Text style={styles.position}>
                        Population Program Officer I – Dingle
                    </Text>
                </View>
                <View>
                    <Text style={styles.name}>Jemar Harold G. Jison</Text>
                    <Text style={styles.position}>
                        Population Program Officer I – Dueñas
                    </Text>
                </View>
                <View>
                    <Text style={styles.name}>Reajean Diaz</Text>
                    <Text style={styles.position}>
                        Population Program Officer I – Dumangas
                    </Text>
                </View>
                <View>
                    <Text style={styles.name}>Helen C. Casama</Text>
                    <Text style={styles.position}>
                        Population Program Officer I – San Enrique
                    </Text>
                </View>
                <View>
                    <Text style={[styles.name, { color: 'orange' }]}>
                        District V
                    </Text>
                    <Text style={styles.position}></Text>
                </View>
                <View>
                    <Text style={styles.name}>
                        Rose Grace January V. Azucena
                    </Text>
                    <Text style={styles.position}>
                        Population Program Officer II
                    </Text>
                </View>

                <View>
                    <Text style={styles.name}>Mary Ann M. Dignadice</Text>
                    <Text style={styles.position}>
                        Population Program Officer I – Ajuy
                    </Text>
                </View>
                <View>
                    <Text style={styles.name}>Joyce B. Miane</Text>
                    <Text style={styles.position}>
                        Population Program Officer I – Balasan
                    </Text>
                </View>
                <View>
                    <Text style={styles.name}>Queenie Lou E. Baban</Text>
                    <Text style={styles.position}>
                        Population Program Officer I – Barotac Viejo
                    </Text>
                </View>
                <View>
                    <Text style={styles.name}>John Gilbert M. Rubias</Text>
                    <Text style={styles.position}>
                        Population Program Officer I – Batad
                    </Text>
                </View>
                <View>
                    <Text style={styles.name}>Verjie C. Dela Cruz</Text>
                    <Text style={styles.position}>
                        Population Program Officer I – Carles
                    </Text>
                </View>
                <View>
                    <Text style={styles.name}>Mary Nel P. Franco</Text>
                    <Text style={styles.position}>
                        Population Program Officer I – Concepcion
                    </Text>
                </View>
                <View>
                    <Text style={styles.name}>Bernadine Adaniel</Text>
                    <Text style={styles.position}>
                        Population Program Officer I – Estancia
                    </Text>
                </View>
                <View>
                    <Text style={styles.name}>Roselo S. Porras</Text>
                    <Text style={styles.position}>
                        Population Program Officer I – Lemery
                    </Text>
                </View>
                <View>
                    <Text style={styles.name}>Ria B. Figura</Text>
                    <Text style={styles.position}>
                        Population Program Officer I – San Dionisio
                    </Text>
                </View>
                <View>
                    <Text style={styles.name}>Lynnie B. Jemena</Text>
                    <Text style={styles.position}>
                        Population Program Officer I – San Rafael
                    </Text>
                </View>
                <View>
                    <Text style={styles.name}>Jayson A. Esteba</Text>
                    <Text style={styles.position}>
                        Population Program Officer I – Sara
                    </Text>
                </View>

                <Text style={styles.divisions}>
                    Association of Population Volunteer Workers-Iloilo, Inc
                </Text>
                <Text style={styles.position}>Province of Iloilo</Text>

                <View>
                    <Text style={styles.name}>President</Text>
                    <Text style={styles.position}>Margarita R. Lacerna</Text>
                </View>
                <View>
                    <Text style={styles.name}>Vice President</Text>
                    <Text style={styles.position}>Anecia Parcon</Text>
                </View>
                <View>
                    <Text style={styles.name}>Secretary</Text>
                    <Text style={styles.position}>Rose Mary Galvan</Text>
                </View>
                <View>
                    <Text style={styles.name}>Treasurer</Text>
                    <Text style={styles.position}>Rovema Palma</Text>
                </View>
                <View>
                    <Text style={styles.name}>Asst. Treasurer</Text>
                    <Text style={styles.position}>Vacant</Text>
                </View>
                <View>
                    <Text style={styles.name}>Auditor</Text>
                    <Text style={styles.position}>Nelly Ausan</Text>
                </View>
                <View>
                    <Text style={styles.name}>P.R.O.</Text>
                    <Text style={styles.position}>Catherine Pamulag</Text>
                </View>
                <View>
                    <Text style={styles.name}>Board of Directors</Text>
                    <Text style={styles.position}></Text>
                </View>
                <View>
                    <Text style={styles.name}>District I</Text>
                    <Text style={styles.position}>Francisca Tanallon</Text>
                </View>
                <View>
                    <Text style={styles.name}>District II</Text>
                    <Text style={styles.position}>LidaCanaman</Text>
                </View>
                <View>
                    <Text style={styles.name}>District III</Text>
                    <Text style={styles.position}>Mary Ann Lelis</Text>
                </View>
                <View>
                    <Text style={styles.name}>District IV</Text>
                    <Text style={styles.position}>Sonia Corbadora</Text>
                </View>
                <View>
                    <Text style={styles.name}>District V</Text>
                    <Text style={styles.position}>Eva Aposaga</Text>
                </View>

                <Text style={styles.divisions}>
                    BARANGAY SERVICE POINT OFFICERS (BSPOs)
                </Text>
                <Text style={styles.position}>
                    Municipal Federation Presidents
                </Text>

                <View>
                    <Text style={[styles.name, { color: 'orange' }]}>
                        DISTRICT I
                    </Text>
                    <Text style={styles.position}></Text>
                </View>
                <View>
                    <Text style={styles.name}>Guimbal</Text>
                    <Text style={styles.position}>ResureccionGegrimal</Text>
                </View>
                <View>
                    <Text style={styles.name}>Igbaras</Text>
                    <Text style={styles.position}>Ma. Corazon Macalalag</Text>
                </View>
                <View>
                    <Text style={styles.name}>Miag-ao</Text>
                    <Text style={styles.position}>Rose Mary Galvan</Text>
                </View>
                <View>
                    <Text style={styles.name}>Oton</Text>
                    <Text style={styles.position}>Renato Dalida</Text>
                </View>
                <View>
                    <Text style={styles.name}>San Joaquin</Text>
                    <Text style={styles.position}>Rita Francisco</Text>
                </View>
                <View>
                    <Text style={styles.name}>Tigbauan</Text>
                    <Text style={styles.position}>LilibethTantiado</Text>
                </View>
                <View>
                    <Text style={styles.name}>Tubungan</Text>
                    <Text style={styles.position}>Francisca Tanallon</Text>
                </View>
                <View>
                    <Text style={[styles.name, { color: 'orange' }]}>
                        DISTRICT II
                    </Text>
                    <Text style={styles.position}></Text>
                </View>
                <View>
                    <Text style={styles.name}>Alimodian</Text>
                    <Text style={styles.position}>LidaCanaman</Text>
                </View>
                <View>
                    <Text style={styles.name}>Leganes</Text>
                    <Text style={styles.position}>MaximiniGumayan, Jr.</Text>
                </View>
                <View>
                    <Text style={styles.name}>Leon</Text>
                    <Text style={styles.position}>Daisy C. Camacho</Text>
                </View>
                <View>
                    <Text style={styles.name}>New Lucena</Text>
                    <Text style={styles.position}>Elizabeth Sindol</Text>
                </View>
                <View>
                    <Text style={styles.name}>Pavia</Text>
                    <Text style={styles.position}>Ma. Rosanna Bugna</Text>
                </View>
                <View>
                    <Text style={styles.name}>San Miguel</Text>
                    <Text style={styles.position}>Gloria Salcedo</Text>
                </View>
                <View>
                    <Text style={styles.name}>Sta. Barbara</Text>
                    <Text style={styles.position}>LuzmindaSolas</Text>
                </View>
                <View>
                    <Text style={styles.name}>Zarraga</Text>
                    <Text style={styles.position}>ErdelindaDefensor</Text>
                </View>
                <View>
                    <Text style={[styles.name, { color: 'orange' }]}>
                        DISTRICT III
                    </Text>
                    <Text style={styles.position}></Text>
                </View>
                <View>
                    <Text style={styles.name}>Badiangan</Text>
                    <Text style={styles.position}>Arlene A. Arenga</Text>
                </View>
                <View>
                    <Text style={styles.name}>Bingawan</Text>
                    <Text style={styles.position}>Ma. ZenaidaLensig</Text>
                </View>
                <View>
                    <Text style={styles.name}>Cabatuan</Text>
                    <Text style={styles.position}>LinieCañasare</Text>
                </View>
                <View>
                    <Text style={styles.name}>Calinog</Text>
                    <Text>Catherine P. Pamulag</Text>
                </View>
                <View>
                    <Text style={styles.name}>Janiuay</Text>
                    <Text style={styles.position}>GeneleneBaldia</Text>
                </View>
                <View>
                    <Text style={styles.name}>Lambunao</Text>
                    <Text style={styles.position}>April Rose Carman</Text>
                </View>
                <View>
                    <Text style={styles.name}>Maasin</Text>
                    <Text style={styles.position}>Margarita Lacerna</Text>
                </View>
                <View>
                    <Text style={styles.name}>Mina</Text>
                    <Text style={styles.position}>Mary Ann Lelis</Text>
                </View>
                <View>
                    <Text style={styles.name}>Pototan</Text>
                    <Text style={styles.position}>Ronnie C. Boluai</Text>
                </View>
                <View>
                    <Text style={[styles.name, { color: 'orange' }]}>
                        DISTRICT IV
                    </Text>
                    <Text style={styles.position}></Text>
                </View>
                <View>
                    <Text style={styles.name}>Anilao</Text>
                    <Text style={styles.position}>Ernie Desa</Text>
                </View>
                <View>
                    <Text style={styles.name}>Banate</Text>
                    <Text style={styles.position}>Mina Bacabac</Text>
                </View>
                <View>
                    <Text style={styles.name}>Barotac Nuevo</Text>
                    <Text style={styles.position}>Sonia Carbadura</Text>
                </View>
                <View>
                    <Text style={styles.name}>Dingle</Text>
                    <Text style={styles.position}>Merlyn Figueroa</Text>
                </View>
                <View>
                    <Text style={styles.name}>Dueñas</Text>
                    <Text style={styles.position}>ConsolacionLaguartilla</Text>
                </View>
                <View>
                    <Text style={styles.name}>Dumangas</Text>
                    <Text style={styles.position}>Rose Marie D. Ombao</Text>
                </View>
                <View>
                    <Text style={styles.name}>San Enrique</Text>
                    <Text style={styles.position}>Melende Padilla</Text>
                </View>
                <View>
                    <Text style={styles.name}>Passi City</Text>
                    <Text style={styles.position}>Rovema A. Palma</Text>
                </View>
                <View>
                    <Text style={[styles.name, { color: 'orange' }]}>
                        DISTRICT V
                    </Text>
                    <Text style={styles.position}></Text>
                </View>
                <View>
                    <Text style={styles.name}>Ajuy</Text>
                    <Text style={styles.position}>Remedios Villanueva</Text>
                </View>
                <View>
                    <Text style={styles.name}>Balasan</Text>
                    <Text style={styles.position}>Rebecca V. Veloso</Text>
                </View>
                <View>
                    <Text style={styles.name}>Barotac Viejo</Text>
                    <Text style={styles.position}>Merlyn Barreto</Text>
                </View>
                <View>
                    <Text style={styles.name}>Batad</Text>
                    <Text style={styles.position}>Lucile Cordero</Text>
                </View>
                <View>
                    <Text style={styles.name}>Carles</Text>
                    <Text style={styles.position}>Liza D. Medina</Text>
                </View>
                <View>
                    <Text style={styles.name}>Concepcion</Text>
                    <Text style={styles.position}>Estela Valeriano</Text>
                </View>
                <View>
                    <Text style={styles.name}>Estancia</Text>
                    <Text style={styles.position}>Nelly C. Ausan</Text>
                </View>
                <View>
                    <Text style={styles.name}>Lemery</Text>
                    <Text style={styles.position}>Eva Aposaga</Text>
                </View>
                <View>
                    <Text style={styles.name}>San Dionisio</Text>
                    <Text style={styles.position}>Roy Blancaflor</Text>
                </View>
                <View>
                    <Text style={styles.name}>San Rafael</Text>
                    <Text style={styles.position}>Liezyl Abarro</Text>
                </View>
                <View>
                    <Text style={styles.name}>Sara</Text>
                    <Text style={styles.position}>Anecia Parcon</Text>
                </View>

                <View style={{ height: 150 }} />
            </ScrollView>
        </View>
    );
}

import Colors from '../../../constants/Colors';
import SearchNav from '../home/components/search/search';
import useColorScheme from '../../../hooks/useColorScheme';
import { ScrollView } from 'react-native-gesture-handler';
import BackContainer from '../../../shared/back-container/back-container';
