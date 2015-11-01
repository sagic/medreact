'use strict';

var $ = require('jquery');
var _ = require('lodash-node');

var React = require('react');
var Link = require('react-router').Link;
var THREE = require('three');

require('../three-utils/TrackballControls');
require('../three-utils/TerrainLoader');

function intDividers(n1, n2) {
  var ret = [];
  var min = Math.min(n1, n2);
  for (var i = 2; i < min; i++) {
    if (isInt(n1 / i) && isInt(n2 / i)) {
      ret.push(i);
    }
  }
  return ret;
}

function isInt(value) {
  var x;
  if (isNaN(value)) {
    return false;
  }
  x = parseFloat(value);
  return (x | 0) === x;
}

module.exports = React.createClass({

  scene: null,
  camera: null,
  splineCamera: null,
  renderer: null,
  cameraHelper: null,
  canvas: null,
  clock: new THREE.Clock(),

  getInitialState: function () {
    return {};
  },

  componentDidMount: function () {
    this.createScene();
  },

  shouldComponentUpdate: function (nextProps, nextState) {
    return this.canvas === null;
  },

  createScene: function () {
    this.scene = new THREE.Scene();
    this.scene.add(new THREE.AxisHelper(200));

    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.set(0, -50, 50);

    this.renderer = new THREE.WebGLRenderer({
      alpha: true
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0xffffff, 0);

    this.splineCamera = new THREE.PerspectiveCamera(84, window.innerWidth / window.innerHeight, 0.01, 1000);
    this.scene.add(this.splineCamera);

    //this.cameraHelper = new THREE.CameraHelper(this.splineCamera);
    //this.scene.add(this.cameraHelper);

    this.canvas = this.renderer.domElement;

    $('#exhibition-container').append(this.canvas);

    this.controls = new THREE.TrackballControls(this.camera, this.renderer.domElement);

    this.loadTerrain();

  },

  loadTerrain: function () {
    var terrainLoader = new THREE.TerrainLoader();
    terrainLoader.load('../../../images/isr1_hm.bin', function (data) {
      var rect1 = {w: 1970, h: 1690};
      var d = 5;//intDividers(rect1.w, rect1.h).pop() || 1;
      var rect2 = {w: (rect1.w / d), h: (rect1.h / d)};

      var sw = rect1.w / rect2.w;
      var sh = rect1.h / rect2.h;

      var geometry = new THREE.PlaneGeometry(60, 60, rect2.w - 1, rect2.h - 1);

      for (var i = 0, l = geometry.vertices.length; i < l; i++) {
        var c = parseInt(i % (rect2.w));
        var r = parseInt(i / (rect2.w));
        var ind = c * sw + r * sh * rect1.w;
        geometry.vertices[i].z = data[ind] / 65535 * 12;
      }

      var plane = THREE.SceneUtils.createMultiMaterialObject(geometry, [
        new THREE.MeshPhongMaterial({
          color: 0x000000,
          wireframe: true,
          opacity: 0.5
        }),
        new THREE.MeshLambertMaterial({
          color: 0xb48555,
          transparent: true,
          opacity: 1
        })
      ]);

      plane.castShadow = true;
      plane.receiveShadow = true;
      this.scene.add(plane);

      //var points = [
      //  new THREE.Vector3(20, 0, 20),
      //  new THREE.Vector3(10, -10, 20),
      //  new THREE.Vector3(0, 0, 20),
      //  new THREE.Vector3(-10, 10, 20),
      //  new THREE.Vector3(-20, 0, 20)
      //];

      var points = [];
      for (i = 0; i < 5; i++) {
        points.push(new THREE.Vector3((Math.random() * 40) - 20, (Math.random() * 40) - 20, 20));
      }

      var raycaster = new THREE.Raycaster();
      //curve = new THREE.SplineCurve3(points);
      this.curve = new THREE.CatmullRomCurve3(points);
      //this.curve = new THREE.Path(curve.getPoints(50));

      var lineGeom = new THREE.Geometry();
      lineGeom.vertices = this.curve.getSpacedPoints(50);
      this.curve = new THREE.CatmullRomCurve3(points);

      _.each(lineGeom.vertices, function (vert) {
        raycaster.set(vert, new THREE.Vector3(0, 0, -1));
        var intersects = raycaster.intersectObject(plane.children[0]);
        if (intersects.length > 0) {
          vert.z = intersects[0].point.z + 2;
        }
      });

      this.curve = new THREE.CatmullRomCurve3(lineGeom.vertices);
      //lineGeom.vertices = this.curve.getSpacedPoints(20);

      this.line = new THREE.Line(
        lineGeom,
        new THREE.LineBasicMaterial({color: 0xff0000})
      );
      this.scene.add(this.line);

      //setPathControls(splineCamera, curve);
      this.clock.start();
      this.animate();

    }.bind(this));
  },

  animate: function () {
    this.controls.update();
    requestAnimationFrame(this.animate);
    this.walkThePath();
    this.renderer.render(this.scene, this.splineCamera);
    //this.renderer.render(this.scene, this.camera);
  },

  walkThePath: function () {
    var looptime = 50;
    var ahead = 0.1;

    var time = this.clock.getElapsedTime();
    var t = (time % looptime) / looptime;
    var pos = this.curve.getPointAt(t);

    this.splineCamera.position.copy(pos);

    var lookAt = this.curve.getPointAt(t + ahead > 1 ? 1 : t + ahead);
    this.splineCamera.up = new THREE.Vector3(0, 0, 1);
    this.splineCamera.lookAt(lookAt);
  },

  render: function () {
    return (
      <div id="exhibition-container"/>
    );
  }
});
