import React from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from './links.style';

import * as Linking from 'expo-linking';

export default function Links() {
    const openLink = ( link: any ) => {
        Linking.openURL( link );
    };
    return (
        <View>
            <Text style={styles.date}>2015</Text>

            <Text style={styles.subTitle}>
                21 Iloilo Teen Centers to Rise Soon
            </Text>
            <TouchableOpacity
                onPress={() => {
                    openLink(
                        'http://iloilo.gov.ph/social-welfare/21-iloilo-teen-centers-rise-soon'
                    );
                }}>
                <Text style={styles.link}>
                    (http://iloilo.gov.ph/social-welfare/21-iloilo-teen-centers-rise-soon)
                </Text>
            </TouchableOpacity>

            <Text style={styles.subTitle}>
                Iloilo Teen Center Finalist in 2015 Galing Pook
            </Text>
            <TouchableOpacity
                onPress={() => {
                    openLink(
                        'http://iloilo.gov.ph/democracy-and-governance-awards-and-recognition/iloilo-teen-center-finalist-2015-galing-pook'
                    );
                }}>
                <Text style={styles.link}>
                    (http://iloilo.gov.ph/democracy-and-governance-awards-and-recognition/iloilo-teen-center-finalist-2015-galing-pook)
                </Text>
            </TouchableOpacity>

            <Text style={styles.date}> 2016 </Text>

            <Text style={styles.subTitle}>Gov. Art at BSPO Congress</Text>
            <TouchableOpacity
                onPress={() => {
                    openLink(
                        'http://iloilo.gov.ph/health-and-sanitation/gov-art-bspo-congres'
                    );
                }}>
                <Text style={styles.link}>
                    (http://iloilo.gov.ph/health-and-sanitation/gov-art-bspo-congres)
                </Text>
            </TouchableOpacity>

            <Text style={styles.subTitle}>
                Inauguration of Teen Center in Zarraga National High School{' '}
            </Text>
            <TouchableOpacity
                onPress={() => {
                    openLink(
                        'http://iloilo.gov.ph/social-welfare-and-development-population/inauguration-teen-center-zarraga-national-high-school'
                    );
                }}>
                <Text style={styles.link}>
                    (http://iloilo.gov.ph/social-welfare-and-development-population/inauguration-teen-center-zarraga-national-high-school)
                </Text>
            </TouchableOpacity>

            <Text style={styles.subTitle}>
                Inauguration of 42nd Teen Center in Bingawan,Iloilo{' '}
            </Text>
            <TouchableOpacity
                onPress={() => {
                    openLink(
                        'http://iloilo.gov.ph/inauguration-42nd-teen-center-bingawaniloilo'
                    );
                }}>
                <Text style={styles.link}>
                    (http://iloilo.gov.ph/inauguration-42nd-teen-center-bingawaniloilo)
                </Text>
            </TouchableOpacity>

            <Text style={styles.subTitle}>
                36th Teen Center Inaugurated in Banate, Iloilo{' '}
            </Text>
            <TouchableOpacity
                onPress={() => {
                    openLink(
                        'http://iloilo.gov.ph/rural-development-infrastructure-education/36th-teen-center-inaugurated-banate-iloilo'
                    );
                }}>
                <Text style={styles.link}>
                    (http://iloilo.gov.ph/rural-development-infrastructure-education/36th-teen-center-inaugurated-banate-iloilo)
                </Text>
            </TouchableOpacity>

            <Text style={styles.subTitle}>
                Turn-over of Teen Center @ San Rafael National High School{' '}
            </Text>
            <TouchableOpacity
                onPress={() => {
                    openLink(
                        'http://iloilo.gov.ph/population-rural-development-education/turn-over-teen-center-san-rafael-national-high-school'
                    );
                }}>
                <Text style={styles.link}>
                    (http://iloilo.gov.ph/population-rural-development-education/turn-over-teen-center-san-rafael-national-high-school)
                </Text>
            </TouchableOpacity>

            <Text style={styles.subTitle}>
                28th Multi-purpose Teen Center in Balasan Inaugurated{' '}
            </Text>
            <TouchableOpacity
                onPress={() => {
                    openLink(
                        'http://iloilo.gov.ph/social-welfare-and-development-population/28th-multi-purpose-teen-center-balasan-inaugurated'
                    );
                }}>
                <Text style={styles.link}>
                    (http://iloilo.gov.ph/social-welfare-and-development-population/28th-multi-purpose-teen-center-balasan-inaugurated)
                </Text>
            </TouchableOpacity>

            <Text style={styles.subTitle}>
                MOA Signing for Tech4Ed in Teen Centers
            </Text>
            <TouchableOpacity
                onPress={() => {
                    openLink(
                        'http://iloilo.gov.ph/education-population-information-technology-computers/moa-signing-tech4ed-teen-centers'
                    );
                }}>
                <Text style={styles.link}>
                    (http://iloilo.gov.ph/education-population-information-technology-computers/moa-signing-tech4ed-teen-centers)
                </Text>
            </TouchableOpacity>

            <Text style={styles.date}>2017</Text>
            <Text style={styles.subTitle}>
                Iloilo to pilot test counseling centers for couples in crisis
            </Text>
            <TouchableOpacity
                onPress={() => {
                    openLink(
                        'http://iloilo.gov.ph/multipurpose-counseling-and-family-development-center/iloilo-pilot-test-counseling-centers-couples'
                    );
                }}>
                <Text style={styles.link}>
                    (http://iloilo.gov.ph/multipurpose-counseling-and-family-development-center/iloilo-pilot-test-counseling-centers-couples)
                </Text>
            </TouchableOpacity>

            <Text style={styles.subTitle}>
                Pototan hosts BSPO Congress 2017
            </Text>
            <TouchableOpacity
                onPress={() => {
                    openLink(
                        'http://iloilo.gov.ph/rural-development/pototan-hosts-bspo-congress-2017'
                    );
                }}>
                <Text style={styles.link}>
                    (http://iloilo.gov.ph/rural-development/pototan-hosts-bspo-congress-2017)
                </Text>
            </TouchableOpacity>

            <Text style={styles.subTitle}>
                Iloilo PPO holds BSPO Congress 2017
            </Text>
            <TouchableOpacity
                onPress={() => {
                    openLink(
                        'http://iloilo.gov.ph/iloilo-ppo-holds-bspo-congress-2017'
                    );
                }}>
                <Text style={styles.link}>
                    http://iloilo.gov.ph/iloilo-ppo-holds-bspo-congress-2017
                </Text>
            </TouchableOpacity>

            <Text style={styles.subTitle}>
                Guimbal NHS wins Capitol’s short film contest
            </Text>
            <TouchableOpacity
                onPress={() => {
                    openLink(
                        'http://iloilo.gov.ph/information-education-campaign-materials-sa-sine/guimbal-nhs-wins-capitol’s-short-film-contest'
                    );
                }}>
                <Text style={styles.link}>
                    (http://iloilo.gov.ph/information-education-campaign-materials-sa-sine/guimbal-nhs-wins-capitol’s-short-film-contest)
                </Text>
            </TouchableOpacity>

            <Text style={styles.subTitle}>
                Teen Center finalist in 2017 Galing Pook Awards
            </Text>
            <TouchableOpacity
                onPress={() => {
                    openLink(
                        'http://iloilo.gov.ph/teen-center-finalist-2017-galing-pook-awards'
                    );
                }}>
                <Text style={styles.link}>
                    (http://iloilo.gov.ph/teen-center-finalist-2017-galing-pook-awards)
                </Text>
            </TouchableOpacity>

            <Text style={styles.subTitle}>44th Teen Center Opens in Batad</Text>
            <TouchableOpacity
                onPress={() => {
                    openLink(
                        'http://iloilo.gov.ph/education/44th-teen-center-opens-batad'
                    );
                }}>
                <Text style={styles.link}>
                    (http://iloilo.gov.ph/education/44th-teen-center-opens-batad)
                </Text>
            </TouchableOpacity>

            <Text style={styles.subTitle}>
                Gov. Defensor @ Opening of Teen Center in Palangguia Pototan
            </Text>
            <TouchableOpacity
                onPress={() => {
                    openLink(
                        'http://iloilo.gov.ph/education/gov-defensor-opening-teen-center-palangguia-pototan'
                    );
                }}>
                <Text style={styles.link}>
                    (http://iloilo.gov.ph/education/gov-defensor-opening-teen-center-palangguia-pototan)
                </Text>
            </TouchableOpacity>

            <Text style={styles.subTitle}>Galing Pook Visitors</Text>
            <TouchableOpacity
                onPress={() => {
                    openLink(
                        'http://iloilo.gov.ph/education/galing-pook-visitors'
                    );
                }}>
                <Text style={styles.link}>
                    (http://iloilo.gov.ph/education/galing-pook-visitors)
                </Text>
            </TouchableOpacity>

            <Text style={styles.subTitle}>
                Opening of Teen Center in Estancia National High School
            </Text>
            <TouchableOpacity
                onPress={() => {
                    openLink(
                        'http://iloilo.gov.ph/education/opening-teen-center-estancia-national-high-school'
                    );
                }}>
                <Text style={styles.link}>
                    (http://iloilo.gov.ph/education/opening-teen-center-estancia-national-high-school)
                </Text>
            </TouchableOpacity>

            <Text style={styles.subTitle}>
                Inauguration of Teen Center in Tambaliza, Concepcion{' '}
            </Text>
            <TouchableOpacity
                onPress={() => {
                    openLink(
                        'http://iloilo.gov.ph/education-population/inauguration-teen-center-tambaliza-concepcion'
                    );
                }}>
                <Text style={styles.link}>
                    (http://iloilo.gov.ph/education-population/inauguration-teen-center-tambaliza-concepcion)
                </Text>
            </TouchableOpacity>

            <Text style={styles.date}> 2018 </Text>
            <Text style={styles.subTitle}>
                BSPO Gives Tribute to Gov. Defensor
            </Text>
            <TouchableOpacity
                onPress={() => {
                    openLink(
                        'http://iloilo.gov.ph/democracy-and-governance/bspo-gives-tribute-gov-defensor'
                    );
                }}>
                <Text style={styles.link}>
                    (http://iloilo.gov.ph/democracy-and-governance/bspo-gives-tribute-gov-defensor)
                </Text>
            </TouchableOpacity>

            <Text style={styles.subTitle}>
                Gov Art at 4th Youth Congress Opening
            </Text>
            <TouchableOpacity
                onPress={() => {
                    openLink(
                        'http://iloilo.gov.ph/youth/gov-art-4th-youth-congress-opening'
                    );
                }}>
                <Text style={styles.link}>
                    (http://iloilo.gov.ph/youth/gov-art-4th-youth-congress-opening)
                </Text>
            </TouchableOpacity>

            <Text style={styles.subTitle}>Iloilo opens 49th teen center</Text>
            <TouchableOpacity
                onPress={() => {
                    openLink(
                        'http://iloilo.gov.ph/school-based-multipurpose-teen-center/iloilo-opens-49th-teen-center'
                    );
                }}>
                <Text style={styles.link}>
                    (http://iloilo.gov.ph/school-based-multipurpose-teen-center/iloilo-opens-49th-teen-center)
                </Text>
            </TouchableOpacity>
            <Text style={styles.subTitle}>
                ART 5M trees survive in Iloilo’s re-greening project{' '}
            </Text>
            <TouchableOpacity
                onPress={() => {
                    openLink(
                        'http://iloilo.gov.ph/tree-planting-re-greening-project-art-cca/5m-trees-survive-iloilo’s-re-greening-project'
                    );
                }}>
                <Text style={styles.link}>
                    (http://iloilo.gov.ph/tree-planting-re-greening-project-art-cca/5m-trees-survive-iloilo’s-re-greening-project)
                </Text>
            </TouchableOpacity>

            <Text style={styles.subTitle}>
                Teen Center Iloilo Province to Strengthen Programs vs Suicide{' '}
            </Text>
            <TouchableOpacity
                onPress={() => {
                    openLink(
                        'http://iloilo.gov.ph/health-and-sanitation/iloilo-province-strengthen-programs-vs-suicide'
                    );
                }}>
                <Text style={styles.link}>
                    (http://iloilo.gov.ph/health-and-sanitation/iloilo-province-strengthen-programs-vs-suicide)
                </Text>
            </TouchableOpacity>

            <View style={{ height: 150 }} />
        </View>
    );
}
