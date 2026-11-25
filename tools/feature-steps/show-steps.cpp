// Prints what the app shows after each key, for the website's feature examples.
// Input: one example per line, "keys". "<" stands for BackSpace, "|" for a mouse click.
#include "fake-app.h"
#include "fake-engine.h"
#include "fake-host.h"
#include "ngosen-globals.h"
#include "ngosen-keysym.h"
#include "ngosen-state.h"
#include <iostream>
#include <memory>
#include <string>
#include <vector>
using ngosen::Field; using ngosen::Mode;
using ngosen::test::FakeApp; using ngosen::test::FakeLoop; using ngosen::test::FakeResources;
static std::string esc(const std::string& s){std::string o;for(char c:s){if(c=='"'||c=='\\')o+='\\';o+=c;}return o;}
int main(){
  std::string line;
  while(std::getline(std::cin,line)){
    for(const Mode mode:{Mode::Sen,Mode::Preedit}){
      FakeResources resources; realMode=mode; realtextLen.store(0);
      Field f; f.frontend="wayland"; f.surroundingText=true; f.preedit=true;
      FakeLoop loop; auto owned=std::make_unique<FakeApp>(loop,f,ngosen::test::AppQuirks{}); FakeApp* app=owned.get();
      ngosen::TypingState state(&resources,std::move(owned)); app->attach(&state);
      std::cout<<"{\"mode\":\""<<(mode==Mode::Sen?"sen":"preedit")<<"\",\"keys\":\""<<esc(line)<<"\",\"steps\":[";
      bool first=true;
      for(char c:line){
        if(c=='|'){g_mouse_clicked.store(true);continue;}
        uint32_t k = c=='<' ? 0xff08u : (uint8_t)c;
        app->type(k); loop.pump(20);
        std::cout<<(first?"":",")<<"\""<<esc(app->text())<<"\""; first=false;
      }
      loop.pump(600);
      std::cout<<"],\"final\":\""<<esc(app->text())<<"\"}\n";
    }
  }
}
