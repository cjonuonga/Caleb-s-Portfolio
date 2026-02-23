import { k } from "./kaboomCtx";

k.loadSprite("Home1", "Generic_Home_1_Layer_1.png", {
  sliceX: 14,
  sliceY: 13,
});

k.loadSprite("Home2", "Generic_Home_1_Layer_2_.png", {
  sliceX: 14,
  sliceY: 13,
});

k.loadSprite("samuel", "Samuel_16x16.png", {
  sliceX: 48,
  sliceY: 18,
  anims: {
    "idle-down": { from: 0, to: 5, loop: true, speed: 3 },
    "idle-up": { from: 6, to: 11, loop: true, speed: 3 },
    "idle-side": { from: 12, to: 17, loop: true, speed: 3 },
    "walk-down": { from: 48, to: 53, loop: true, speed: 8 },
    "walk-up": { from: 96, to: 101, loop: true, speed: 8 },
    "walk-side": { from: 144, to: 149, loop: true, speed: 8 },
  },
});

k.setBackground(k.Color.fromHex("#06402B"));

k.scene("main", async () => {
  const mapData = await (await fetch("/caleb-2d-room.json")).json();

  const TILE_WIDTH = 16;
  const TILE_HEIGHT = 16;
  const TILESET2_FIRSTGID = 1;
  const TILESET1_FIRSTGID = 183;

  for (const layer of mapData.layers) {
    if (layer.type === "tilelayer") {
      const { data, width, name } = layer;

      data.forEach((tileId, index) => {
        if (tileId === 0) return;

        const x = (index % width) * TILE_WIDTH;
        const y = Math.floor(index / width) * TILE_HEIGHT;

        let tilesetName;
        let frame;

        if (tileId >= TILESET1_FIRSTGID) {
          tilesetName = "Home1";
          frame = tileId - TILESET1_FIRSTGID;
        } else {
          tilesetName = "Home2";
          frame = tileId - TILESET2_FIRSTGID;
        }

        const tileComponents = [
          k.sprite(tilesetName, { frame }),
          k.pos(x, y),
          k.z(0), // Base layer z-index
        ];

        // Add collision to Walls layer
        if (name === "Walls") {
          tileComponents.push(k.area());
          tileComponents.push(k.body({ isStatic: true }));
          tileComponents.push("wall");
        }

        k.add(tileComponents);
      });
    }

    // Handle collision objects from your Collision layer
    if (layer.type === "objectgroup" && layer.name === "Collision") {
      for (const obj of layer.objects) {
        // Only add if width and height are greater than 0
        if (obj.width > 0 && obj.height > 0) {
          k.add([
            k.pos(obj.x, obj.y),
            k.area({ width: obj.width, height: obj.height }),
            k.body({ isStatic: true }),
            "collision",
          ]);
        }
      }
    }
  }

  // Add player with higher z-index so it renders on top
  const player = k.add([
    k.sprite("samuel", { anim: "idle-down" }),
    k.pos(220, 120),
    k.area({ width: 12, height: 12, offset: k.vec2(2, 4) }), // Smaller hitbox
    k.body(),
    k.z(1), // Higher z-index than map tiles
    "player",
  ]);

  const SPEED = 100;

  k.onKeyDown("left", () => {
    player.move(-SPEED, 0);
    player.flipX = true;
    if (player.curAnim() !== "walk-side") player.play("walk-side");
  });

  k.onKeyDown("right", () => {
    player.move(SPEED, 0);
    player.flipX = false;
    if (player.curAnim() !== "walk-side") player.play("walk-side");
  });

  k.onKeyDown("up", () => {
    player.move(0, -SPEED);
    if (player.curAnim() !== "walk-up") player.play("walk-up");
  });

  k.onKeyDown("down", () => {
    player.move(0, SPEED);
    if (player.curAnim() !== "walk-down") player.play("walk-down");
  });

  k.onKeyRelease(["left", "right"], () => {
    player.play("idle-side");
  });

  k.onKeyRelease("up", () => {
    player.play("idle-up");
  });

  k.onKeyRelease("down", () => {
    player.play("idle-down");
  });
});

k.go("main");
