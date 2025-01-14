import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  AsyncStorage,
  RefreshControl,
  ActivityIndicator
} from "react-native";
import {
  createAppContainer,
  createStackNavigator,
  createMaterialTopTabNavigator
} from "react-navigation";
import { IconButton, Colors, Card, Button } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import Carousel from "react-native-carousel-control";
import Search from '../screen/Search';
import Cart from '../screen/Cart';

import DetailPage from "./DetailPage";

import axios from 'axios';
import Kategori from "./CategoryScreen.js"
import listproduct from '../screen/ListProduct'
import profil from '../screen/Profil'
import profilDetail from '../components/ProfilDetail'
import search from '../screen/Search'
import EditUser from '../screen/EditUser'

const data = [
  { nameCategory: "Aksesories Gadget & Komputer" },
  { nameCategory: "Alat Musik & Pro Audio" },
  { nameCategory: "Alat Tulis & Perlengkapan Kerja" },
  { nameCategory: "Buku, Film & Musik" },
  { nameCategory: "Camera and Video" },
  { nameCategory: "Computer,Dekstop,Notebook" },
  { nameCategory: "Fashion & Busana Pria" },
  { nameCategory: "Fashion & Busana Wanita" },
  { nameCategory: "Gadget" },
  { nameCategory: "Kesehatan dan Kecantikan" }
];

const list = [
  {
    image: "http://static.bmdstatic.com/pk/product/medium/5c456f9e0df12.jpg",
    nameBarang: "Consina Daypack Nauru Grey",
    discon: "Rp 285.000",
    harga: "269.000"
  },
  {
    image:
      "https://www.mobiledokan.co/wp-content/uploads/2019/04/Realme-C2.jpg",
    nameBarang: "Realme C2 3GB/32GB-Diamond Blue",
    discon: "",
    harga: "1.699.000"
  },
  {
    image: "http://static.bmdstatic.com/pk/product/medium/5cbfcff173f83.jpg",
    nameBarang: "LOCK & LOCK Botol Minum Easy Stopper Bottle 950ml Green",
    discon: "",
    harga: "70.000"
  },
  {
    image:
      "https://id-media.apjonlinecdn.com/catalog/product/cache/e4d64343b1bc593f1c5348fe05efa4a6/F/3/F3J92AA-1_T1539253707.png",
    nameBarang: "HP Slim Blutooth Mouse F3J92AA",
    discon: "Rp 200.000",
    harga: "380.000"
  }
];

// Tab Main Menu
export class MainMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: data,
      list: list,
      Category1: [],
      Category2: [],
      Category3: [],
      list: list,
      token: "",
      id: "",
      isLogin: false,
      refreshing: false,
      loading: true,
      loadingB: true,
      loadingC: true,
      isEmpty: false,
      isEmptyB: false,
      isEmptyC: false
    };
    this.loginasync();
  }

  formatNumber = nums => {
    return nums.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  loginasync = async () => {
    await AsyncStorage.getItem("user", (error, id) => {
      if (id) {
        this.setState({
          isLogin: true,
          id: id
        });
      } else {
        this.setState({
          isLogin: false
        });
      }
    });
    await AsyncStorage.getItem("token", (error, token) => {
      if (token) {
        this.setState({
          isLogin: true,
          token: token
        });
      } else {
        this.setState({
          isLogin: false
        });
      }
    });

    if (this.state.id) {
      alert("Anda sudah login")
    }else{
      alert("Anda belum login")
    }   
  };

  componentDidMount() 
  {

    this._onRefresh();    
  }

  _onRefresh = () =>
  {

    axios
      .get("https://clone-bhineka.herokuapp.com/product?category=1")
      .then(res => {
        const data = res.data;

        if (Object.keys(data).length < 0)
        {
          this.setState({ Category1: data.data, loading: false, isEmpty: true });

        }
        else
        {

          this.setState({ Category1: data.data, loading: false });
        }

      })
      .catch(error => {
        this.setState({ loading: false, error: "something went wrong" });
      });

    axios
      .get("https://clone-bhineka.herokuapp.com/product?category=2")
      .then(res => {
        const data = res.data;

        if (Object.keys(data).length < 0) 
        {
          this.setState({ Category1: data.data, loadingB: false, isEmptyB: true });

        }
        else
        {

          this.setState({ Category2: data.data, loadingB: false });
        }

      })
      .catch(error => {
        this.setState({ loading: false, error: "something went wrong" });
      });

    axios
      .get("https://clone-bhineka.herokuapp.com/product/category=3")
      .then(res => {
        const data = res.data;

        if (Object.keys(data).length < 0) 
        {
          this.setState({ Category1: data.data, loadingC: false, isEmptyC: true });

        }
        else
        {
          this.setState({ Category3: data.data, loadingC: false });
        }

      })
      .catch(error => {
        this.setState({ loading: false, error: "something went wrong" });
      });
  
  }

  handleNavigate = Item => {
    const { navigation } = this.props;
    navigation.navigate("DetailPage", Item);
  };

  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false} 
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={() => this._onRefresh()}
          />
        }
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f2f5f7"
          }}
        >
          <View
            style={{
              flexDirection: "row",
              marginTop: 10,
              marginRight: -13,
              marginLeft: -12
            }}
          >
            <Carousel pageWidth={340}>
              <Card>
                <Card.Cover
                  style={{ height: 230 }}
                  source={{
                    uri:
                      "https://artikel.pricearea.com/wp-content/uploads/2017/10/bkj.jpg"
                  }}
                />
              </Card>
              <Card>
                <Card.Cover
                  style={{ height: 230 }}
                  source={{
                    uri:
                      "https://jadwalevent.web.id/wp-content/uploads/2018/11/promo-1-1.png?w=640"
                  }}
                />
              </Card>
              <Card>
                <Card.Cover
                  style={{ height: 230 }}
                  source={{
                    uri:
                      "http://jadwalevent.web.id/wp-content/uploads/2018/09/promo-9.png?w=640"
                  }}
                />
              </Card>
              <Card>
                <Card.Cover
                  style={{ height: 230 }}
                  source={{
                    uri:
                      "https://cms.dailysocial.id/wp-content/uploads/2016/07/DS-bhi.jpg"
                  }}
                />
              </Card>
              <Card>
                <Card.Cover
                  style={{ height: 230 }}
                  source={{
                    uri: "https://pbs.twimg.com/media/CVb9wNgWcAApCJ7.jpg"
                  }}
                />
              </Card>
            </Carousel>
          </View>
          <View style={{ width: "95%", marginTop: 20, borderWidth: 0 }}>
            <Card style={{ elevation: 5 }}>
              <Card.Title
                style={{
                  borderBottomWidth: 1,
                  borderColor: "#07e8ca",
                  height: 50
                }}
                title="Rekomendasi untuk Anda"
                titleStyle={{ fontSize: 17 }}
                right={props => (
                  <Text
                    style={{ color: "blue", fontWeight: "bold", fontSize: 12 }}
                  >
                    LIHAT SEMUA
                  </Text>
                )}
                rightStyle={{ marginRight: 16 }}
              />
              <Card.Content>
                {
                this.state.loading
                ?
                  <ActivityIndicator size="large" color="#CFD8DC" style={{ marginVertical: 25 }} />
                :
                <FlatList
                  style={{
                    borderWidth: 0,
                    marginLeft: -16,
                    paddingLeft: 10,
                    paddingRight: 30,
                    marginRight: -16
                  }}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={this.state.Category1}
                  renderItem={({ item }) => {
                    return (
                      
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.navigate("DetailPage", item)
                        }
                      >
                        <View
                          style={{
                            width: 180,
                            marginTop: 25,
                            marginBottom: 14
                          }}
                        >
                          <View
                            style={{
                              justifyContent: "center",
                              alignItems: "center"
                            }}
                          >
                            <Image
                              style={{ width: 100, height: 120 }}
                              source={{ uri: item.image }}
                            />
                          </View>
                          <View style={{ marginTop: 12 }}>
                            <Text style={{ fontSize: 15 }} numberOfLines={2}>
                              {item.product}
                            </Text>
                          </View>
                          <View
                            style={{
                              flex: 1,
                              alignItems: "flex-start",
                              justifyContent: "flex-end"
                            }}
                          >
                            <Text style={{ fontWeight: "bold" }}>
                              Rp {this.formatNumber(item.price)}
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    );
                  }}
                  keyExtractor={(item, index) => index}
                />
                }
              </Card.Content>
            </Card>
          </View>
          <View style={{ width: "95%", marginTop: 20, borderWidth: 0 }}>
            <Card style={{ elevation: 5 }}>
              <Card.Title
                style={{
                  borderBottomWidth: 1,
                  borderColor: "#07e8ca",
                  height: 50
                }}
                title="Rekomendasi untuk Anda"
                titleStyle={{ fontSize: 17 }}
                right={props => (
                  <Text
                    style={{ color: "blue", fontWeight: "bold", fontSize: 12 }}
                  >
                    LIHAT SEMUA
                  </Text>
                )}
                rightStyle={{ marginRight: 16 }}
              />
              <Card.Content>
                {
                this.state.loadingB
                ?
                  <ActivityIndicator size="large" color="#CFD8DC" style={{ marginVertical: 25 }} />
                :
                <FlatList
                  style={{
                    borderWidth: 0,
                    marginLeft: -16,
                    paddingLeft: 10,
                    paddingRight: 30,
                    marginRight: -16
                  }}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={this.state.Category2}
                  renderItem={({ item }) => {
                    return (
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.navigate("DetailPage", item)
                        }
                      >
                        <View
                          style={{
                            width: 180,
                            marginTop: 25,
                            marginBottom: 14
                          }}
                        >
                          <View
                            style={{
                              justifyContent: "center",
                              alignItems: "center"
                            }}
                          >
                            <Image
                              style={{ width: 100, height: 120 }}
                              source={{ uri: item.image }}
                            />
                          </View>
                          <View style={{ marginTop: 12 }}>
                            <Text style={{ fontSize: 15 }} numberOfLines={2}>
                              {item.product}
                            </Text>
                          </View>
                          <View
                            style={{
                              flex: 1,
                              alignItems: "flex-start",
                              justifyContent: "flex-end"
                            }}
                          >
                            <Text style={{ fontWeight: "bold" }}>
                              Rp {this.formatNumber(item.price)}
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    );
                  }}
                  keyExtractor={(item, index) => index}
                />
                }
              </Card.Content>
            </Card>
          </View>
          <View style={{ width: "95%", marginTop: 20, borderWidth: 0 }}>
            <Card style={{ elevation: 5 }}>
              <Card.Title
                style={{
                  borderBottomWidth: 1,
                  borderColor: "#07e8ca",
                  height: 50
                }}
                title="Rekomendasi untuk Anda"
                titleStyle={{ fontSize: 17 }}
                right={props => (
                  <Text
                    style={{ color: "blue", fontWeight: "bold", fontSize: 12 }}
                  >
                    LIHAT SEMUA
                  </Text>
                )}
                rightStyle={{ marginRight: 16 }}
              />
              <Card.Content>
                {
                this.state.loadingC 
                ?
                <ActivityIndicator size="large" color="#CFD8DC" style={{ marginVertical: 25 }} />
                :
                <FlatList
                  style={{
                    borderWidth: 0,
                    marginLeft: -16,
                    paddingLeft: 10,
                    paddingRight: 30,
                    marginRight: -16
                  }}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={this.state.Category3}
                  renderItem={({ item }) => {
                    return (
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.navigate("DetailPage", item)
                        }
                      >
                        <View
                          style={{
                            width: 180,
                            marginTop: 25,
                            marginBottom: 14
                          }}
                        >
                          <View
                            style={{
                              justifyContent: "center",
                              alignItems: "center"
                            }}
                          >
                            <Image
                              style={{ width: 100, height: 120 }}
                              source={{ uri: item.image }}
                            />
                          </View>
                          <View style={{ marginTop: 12 }}>
                            <Text style={{ fontSize: 15 }} numberOfLines={2}>
                              {item.product}
                            </Text>
                          </View>
                          <View
                            style={{
                              flex: 1,
                              alignItems: "flex-start",
                              justifyContent: "flex-end"
                            }}
                          >
                            <Text style={{ fontWeight: "bold" }}>
                              Rp {this.formatNumber(item.price)}
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    );
                  }}
                  keyExtractor={(item, index) => index}
                />
                }
              </Card.Content>
            </Card>
          </View>
         </View>
      </ScrollView>
    );
  }
}

//Tab Navigation
const TabNavigator = createMaterialTopTabNavigator(
  {
    JELAJAH: MainMenu,
    KATEGORI: Kategori
  },
  {
    tabBarOptions: {
      activeTintColor: "#FFFFFF",
      inactiveTintColor: "#F8F8F8",
      style: {
        backgroundColor: "#092B51"
      },
      labelStyle: {
        fontSize: 14,
        fontWeight: "bold"
      },
      indicatorStyle: {
        borderBottomColor: "#87B56A",
        borderBottomWidth: 2
      }
    }
  }
);

//Stack Navigation
const Stack = createStackNavigator({
    TabNavigator: {
        screen: TabNavigator,
        navigationOptions:({ navigation }) => ({
            headerLeft: (
                <IconButton
                    icon='menu'
                    color={Colors.white}
                    size={25}
                    onPress={() => {navigation.openDrawer()}}
                />
            ),
            headerRight: (
                <View style={{flexDirection:'row'}}>
                    <IconButton
                        style={{marginRight:-3}}
                        icon='search'
                        color={Colors.white}
                        size={25}
                        onPress={() => alert("coming soon")}
                    />
                    <IconButton
                        icon='shopping-cart'
                        color={Colors.white}
                        size={22}
                        onPress={() => {navigation.navigate('Cart',)}}
                    />
                </View>
            ),
            headerStyle: {
                backgroundColor: '#092B51',
                elevation:0
            },
            headerTitle: (
                <Image
                    style={{height:20, width:110}}
                    source={require("../assets/image/baner1.png")}
                />
            ),
        })
    },
    DetailPage: {
        screen: DetailPage
    },
    ListProduct: { 
        screen: listproduct,
    },

    Search: {
        screen: Search,
        navigationOptions: {header: null}
    },
    Profil: { 
        screen: profil,
        navigationOptions:({ navigation }) => ({
            headerLeft: (
                <IconButton
                    icon='menu'
                    color={Colors.white}
                    size={25}
                    onPress={() => {navigation.openDrawer()}}
                />
            ),
            headerRight: (
                <IconButton
                    icon='shopping-cart'
                    color={Colors.white}
                    size={22}
                    onPress={() => {navigation.navigate('Cart')}}
                />
            ),
            headerStyle: {
                backgroundColor: '#092B51',
                elevation:0
            },
            
            headerTintColor: '#fff',
            title: 'Akun Saya',
        })
    },
    ProfilDetail: {
        screen: profilDetail,
        navigationOptions:({ navigation }) => ({
            headerStyle: {
                backgroundColor: '#092B51',
                elevation:0
            },  
            headerTintColor: '#fff',
            title: 'Profil',
        })
    },
    Search: {
        screen: search,
        navigationOptions: { header: null }
    },
    Cart: {
        screen: Cart,
        navigationOptions: {header: null}
    },
    EditUser: {
        screen: EditUser,
        navigationOptions: {header: null}
    }
})

// connect with redux,first param is map and second is component
// export default connect(mapStateToProps)(Login);
export default createAppContainer(Stack);
